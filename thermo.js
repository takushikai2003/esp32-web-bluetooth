//BlueJellyのインスタンス生成
const ble = new BlueJelly();

//デバイス接続/切断処理
document.getElementById('connect').addEventListener('click', function() {
    ble.scan('Temperature');
});
document.getElementById('disconnect').addEventListener('click', function() {
    ble.reset(); //reset is disconnect & clear
});
//読み込み/Notifyの処理
document.getElementById('readdata').addEventListener('click', function() {
    ble.read('Temperature');
});
document.getElementById('startnotify').addEventListener('click', function() {
    ble.startNotify('Temperature');
});
document.getElementById('stopnotify').addEventListener('click', function() {
    ble.stopNotify('Temperature');
});

window.onload = function() {
    document.getElementById('device_name').innerHTML = "No Device";
    document.getElementById('data_text').innerHTML = "No Data"
    //UUIDの設定
    ble.setUUID("Temperature", "0000181a-0000-1000-8000-00805f9b34fb", "00002a6e-0000-1000-8000-00805f9b34fb");
}
//--------------------------------------------------
//Scan後の処理
//--------------------------------------------------
ble.onScan = function(deviceName) {
    //HTMLに表示
    document.getElementById('device_name').innerHTML = deviceName;
    ble.read('Temperature');
}
//--------------------------------------------------
//Read後の処理：得られたデータの表示など行う
//--------------------------------------------------
ble.onRead = function(data, uuid) {
    //フォーマットに従って値を取得(16ビットデータ。エンディアンに注意)
    value = data.getUint16(0, true); //取り込み
    var Temp;
    Temp = value * 0.01;
    //HTMLに値を表示
    document.getElementById('data_text').innerHTML = Temp.toFixed(2) + '%';
}
//--------------------------------------------------
//Reset後の処理
//--------------------------------------------------
ble.onReset = function() {
    //HTMLに表示
    document.getElementById('device_name').innerHTML = "No Device";
}