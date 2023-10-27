import time
import MetaTrader5 as mt5
import sys
import json
 
path = "C:\Program Files\MetaTrader 5\\terminal64.exe"
login = 30115852
password = "1JE3jx8W"
server = "GrowthNext-Demo"

# selected_function = sys.argv[1]
# json_data = sys.argv[2]

# data = json.loads(json_data)

# data_variable = data.get("data")
# order_variable = data.get("order")

# functionName = sys.argv[1]
# jsonData = sys.argv[2]

# data = json.loads(jsonData)

# formData = data.get("formData")

# # symbol = formData.get("symbol")
# transaction = formData.get("transaction")
# lot = formData.get("lot")
# pendingLot = formData.get("pendingLot")
# profitLot = formData.get("profitLot")
# lossLot = formData.get("lossLot")

# if pendingLot == None:

print(functionName)
print(formData)

def sendOrder(account):
    print("sendorder")
    # establish connection to the MetaTrader 5 terminal
    if not mt5.initialize(path=path,login=account["login"],password=account["password"],server=account["server"]):
        print("initialize() failed, error code =",mt5.last_error())
        quit()
    
    symbol = formData.get("symbol")
    
    # add symbol to market watch and add extension to TFF
    if(account["server"] == "TrueProprietaryFunds-Demo"):
        symbol = "AUDUSD" + ".tff"
        
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
    
    lot = formData.get("lot")
    point = mt5.symbol_info(symbol).point
    price = formData.get("pendingLot")
    deviation = 5
    
        
    
    request = {
        "action": mt5.TRADE_ACTION_PENDING,
        "symbol": symbol,
        "volume": lot,
        "type": mt5.ORDER_TYPE_SELL_LIMIT,
        "price": price,
        # "sl": price - 100 * point,
        # "tp": price + 100 * point,
        "deviation": deviation,
        "magic": 234000,
        "comment": "python script open",
        "type_time": mt5.ORDER_TIME_GTC,
        "type_filling": mt5.ORDER_FILLING_RETURN,
    }
    
    # send a trading request
    result = mt5.order_send(request)
    # check the execution result
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
    
    print("2. order_send done, ", result)
    print("   opened position with POSITION_TICKET={}".format(result.order))
    print("   sleep 2 seconds before closing position #{}".format(result.order))
    time.sleep(2)
    # create a close request
    position_id=result.order
    price=mt5.symbol_info_tick(symbol).bid
    deviation=20
    request={
        "action": mt5.TRADE_ACTION_DEAL,
        "symbol": symbol,
        "volume": lot,
        "type": mt5.ORDER_TYPE_SELL,
        "position": position_id,
        "price": price,
        "deviation": deviation,
        "magic": 234000,
        "comment": "python script close",
        "type_time": mt5.ORDER_TIME_GTC,
        "type_filling": mt5.ORDER_FILLING_RETURN,
    }
    # send a trading request
    result=mt5.order_send(request)
    # check the execution result
    print("3. close position #{}: sell {} {} lots at {} with deviation={} points".format(position_id,symbol,lot,price,deviation));
    if result.retcode != mt5.TRADE_RETCODE_DONE:
        print("4. order_send failed, retcode={}".format(result.retcode))
        print("   result",result)
    else:
        print("4. position #{} closed, {}".format(position_id,result))
        # request the result as a dictionary and display it element by element
        result_dict=result._asdict()
        for field in result_dict.keys():
            print("   {}={}".format(field,result_dict[field]))
            # if this is a trading request structure, display it element by element as well
            if field=="request":
                traderequest_dict=result_dict[field]._asdict()
                for tradereq_filed in traderequest_dict:
                    print("       traderequest: {}={}".format(tradereq_filed,traderequest_dict[tradereq_filed]))
    
    # shut down connection to the MetaTrader 5 terminal
    result_data = {
    "message": "This is a result message",
    "value": 42,
    "other_data": "Some additional data"
    }
    print(json.dumps(result_data))
    
    mt5.shutdown()

# if selected_function == "sendOrder":
#     sendOrder()

accounts = [
    # {
    #     "login": 1155861,
    #     "password": "PkHR87ka%y3EKZ",
    #     "server": "TrueProprietaryFunds-Demo"
    # },
    {
        "login": 122335061,
        "password": "Rawspread!1",
        "server": "Exness-MT5Trial7",
    },
    # {
    #     "login": 2367308,
    #     "password": "Qj8(9T7hE$",
    #     "server": "FivePercentOnline-Real",
    # },
]



if functionName == "sendOrder":
    sendOrder(accounts[0])

# for account in accounts:
#     sendOrder(account)


