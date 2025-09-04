let plugStatus = {
    isOn:false,
    powerUsage:0,
};

export function getPlugStatus(){
    return plugStatus;
}

export function togglePlug() {
    plugStatus.isOn = !plugStatus.isOn;
    if (!plugStatus.isOn){
        plugStatus.powerUsage = 0;
    }
    return plugStatus;
}

export function simulatePowerUsage (){
    if(plugStatus.isOn){
        plugStatus.powerUsage = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
    }
    
    return plugStatus;
}
