import MetaTrader5 as mt5
import sys
import json
 
path = "C:\Program Files\MetaTrader 5\\terminal64.exe"

# selected_function = sys.argv[1]
# json_data = sys.argv[2]

# data = json.loads(json_data)

# data_variable = data.get("data")
# order_variable = data.get("order")

functionName = sys.argv[1]
jsonData = sys.argv[2]

data = json.loads(jsonData)

# symbol = formData.get("symbol")

# if pendingLot == None:

# print(functionName)
# print(formData)

def sendOrder(account):
    
    formData = data.get("formData")
    
    # establish connection to the MetaTrader 5 terminal
    if not mt5.initialize(path=path,login=account["login"],password=account["password"],server=account["server"]):
        print("initialize() failed, error code =",mt5.last_error())
        quit()
    
    symbol = formData.get("symbol")
    
    # add symbol to market watch and add extension to TFF
    if(account["server"] == "TrueProprietaryFunds-Demo"):
        symbol = symbol + ".tff"
        
    symbol_info = mt5.symbol_info(symbol)
    if symbol_info is None:
        print(symbol, "not found, can not call order_check()")
        mt5.shutdown()
        quit()
        
    # if the symbol is unavailable in MarketWatch, add it
    if not symbol_info.visible:
        print(symbol, "is not visible, trying to switch on")
        if not mt5.symbol_select(symbol,True):
            print("symbol_select({}}) failed, exit",symbol)
            mt5.shutdown()
            quit()
    
    lot = float(formData.get("lot"))
    point = mt5.symbol_info(symbol).point
    
    deviation = 5
    transaction = formData.get("transaction")

    if formData.get("pendingLot") != None:
          price = float(formData.get("pendingLot"))

    if formData.get("lossLot") != None:
        sl = float(formData.get("lossLot"))
    else:
        sl = 0
    
    if formData.get("profitLot") != None:
        tp = float(formData.get("profitLot"))
    else:
        tp = 0
    
    symbol_tick = mt5.symbol_info_tick(symbol)
    
    if formData.get("pendingLot") == None:
        action = mt5.TRADE_ACTION_PENDING
        if transaction == "buy":
            marketType = mt5.ORDER_TYPE_BUY_STOP
            price = symbol_tick.ask
        else:
            marketType = mt5.ORDER_TYPE_SELL_STOP 
            price = symbol_tick.bid
    else:
        action = mt5.TRADE_ACTION_PENDING
        if transaction == "buy":
            if price < symbol_tick.ask :
                marketType = mt5.ORDER_TYPE_BUY_LIMIT
            else:
                marketType = mt5.ORDER_TYPE_BUY_STOP
        else:
            if price > symbol_tick.bid :
                marketType = mt5.ORDER_TYPE_SELL_LIMIT
            else:
                marketType = mt5.ORDER_TYPE_SELL_STOP
        
    request = {
        "action": action,
        "symbol": symbol,
        "volume": lot,
        "type": marketType,
        "price": price,
        # "sl": sl,
        # "tp": tp,
        "deviation": deviation,
        "magic": 234000,
        "comment": "python script open",
        "type_time": mt5.ORDER_TIME_GTC,
        "type_filling": mt5.ORDER_FILLING_RETURN,
    }
    
    request2 = {
             "action": action,
        "symbol": symbol,
        "volume": lot,
        "type": marketType,
        "price": price,
        "sl": sl,
        "tp": tp,
        "deviation": deviation,
        "magic": 234000,
        "comment": "python script open",
        "type_time": mt5.ORDER_TIME_GTC,
        "type_filling": mt5.ORDER_FILLING_RETURN,
        
    }
    

    if(formData.get("lossLot") != None and formData.get("profitLot") != None):
        result = mt5.order_send(request2)
    else:
        result = mt5.order_send(request)
        
    print("retcode", result.retcode)

    # check the execution result
    print(price)
    print(symbol_tick.bid)
    print(request)
    
    print("1. order_send(): by {} {} lots at {} with deviation={} points".format(symbol,lot,price,deviation));
    if result.retcode != mt5.TRADE_RETCODE_DONE:
        print("2. order_send failed, retcode={}".format(result.retcode))
        # request the result as a dictionary and display it element by element
        result_dict=result._asdict()
        for field in result_dict.keys():
            print("   {}={}".format(field,result_dict[field]))
            # if this is a trading request structure, display it element by element as well
            if field=="request":
                traderequest_dict=result_dict[field]._asdict()
                for tradereq_filed in traderequest_dict:
                    print("       traderequest: {}={}".format(tradereq_filed,traderequest_dict[tradereq_filed]))
        print("shutdown() and quit")
        mt5.shutdown()
        quit()
    
    
    mt5.shutdown()

accounts = [
    {
        "login": 1155861,
        "password": "PkHR87ka%y3EKZ",
        "server": "TrueProprietaryFunds-Demo"
    },
    # {
    #     "login": 122335061,
    #     "password": "Rawspread!1",
    #     "server": "Exness-MT5Trial7",
    #     "multiplier": "1",
    # },
    # {
    #     "login": 79116024,
    #     "password": "ZeroDemo1",
    #     "server": "Exness-MT5Trial8",
    #     "multiplier": "0.5",
        
    # },
    {
        "login": 2367308,
        "password": "Qj8(9T7hE$",
        "server": "FivePercentOnline-Real",
    },
]

for account in accounts:
    sendOrder(account)


