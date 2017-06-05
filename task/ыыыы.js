function runModel(input){
let target = [];
let inputData = input.slice();
let counter=0;
while(target.indexOf('заплатить')==-1){
    if(counter++>5){
	    console.log("Недостаточно входных данных, введите другие или дополните");
	    break;
    }

    if(inputData.indexOf('есть деньги')!=-1 && inputData.indexOf('купить что-то')!=-1 ){
        inputData.push('заплатить');
	    target.push('заплатить');
	    continue;
	}

    if(inputData.indexOf('сходить в магазин')!=-1 && inputData.indexOf('купить что-то')==-1){
        inputData.push('купить что-то');
        continue;
	}
}
    if(target.length>0){
        console.log("цель: '"+target[0]+"' достигнута за "+ counter+" шаг" );
        console.log("база знаний составляет: "+inputData);
    }
}

var sd = [ ["сходить в магазин", "есть деньги"], ["сходить в магазин"], [ "есть деньги"], ["купить что-то", "есть деньги"], ["сходить в магазин", "купить что-то"]];
for(let i= 0; i<sd.length; i++){
    console.log((i+1)); runModel(sd[i]);
}
