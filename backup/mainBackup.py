import time
import MetaTrader5 as mt5
import sys
import json
 
path = "C:\Program Files\MetaTrader 5\terminal64.exe"
# login = 30115852
# password = "1JE3jx8W"
# server = "GrowthNext-Demo"

selected_function = sys.argv[1]
json_data = sys.argv[2]

data = json.loads(json_data)

data_variable = data.get("data")
order_variable = data.get("order")


def sendOrder(data):
    print(data_variable['server']);
    if not mt5.initialize(login=data_variable['login'], server = data_variable['server'], password= data_variable['password']):
        print("initialize() failed, error code =",mt5.last_error())
        quit()
    
    symbol = "GBPUSD"
    symbol_info = mt5.symbol_info(symbol)
    
    # if symbol_info is None:
    #     print(symbol, "not found, can not call order_check()")
    #     mt5.shutdown()
    #     quit()
    
    # if the symbol is unavailable in MarketWatch, add it
    if not symbol_info.visible:
        print(symbol, "is not visible, trying to switch on")
        if not mt5.symbol_select(symbol,True):
            print("symbol_select({}}) failed, exit",symbol)
            mt5.shutdown()
            quit()
            
    lot = order_variable['lot']
    point = mt5.symbol_info(symbol).point
    price = mt5.symbol_info_tick(symbol).ask
    deviation = 20
    
    # if(order['lot'] == "Buy")
    
    request = {
        "action": mt5.TRADE_ACTION_DEAL,
        "symbol": symbol,
        "volume": lot,
        "type": mt5.ORDER_TYPE_BUY,
        "price": price,
        "sl": price - 100 * point,
        "tp": price + 100 * point,
        "deviation": deviation,
        # "magic": 234000,
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
    mt5.shutdown()
 
if selected_function == "sendOrder":
    sendOrder(data)
