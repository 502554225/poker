export default [
  async function(vm,str,num1,num2) {//skill 0 单体攻击1.5倍
    console.log('skill-0')
    if (str==='op'){
      vm.$set(vm.my[num1],'action',"my-atc-" + vm.opponent[num2].position.x + '-' + vm.opponent[num2].position.y)
    }
    else {
      vm.$set(vm.opponent[num1],'action',"op-atc-" + vm.my[num2].position.x + '-' + vm.my[num2].position.y)
    }
    setTimeout(await function() {
      vm.damage(str,num1,num2,1.5)
    },400)
    if (str==='op') vm.$set(vm.my[num1],'vigour',0)
    else vm.$set(vm.opponent[num1],'vigour',0)
  },
  async function(vm,str,num1,num2){//skill 1 单体攻击1.8倍
    if (str==='op'){
      vm.$set(vm.my[num1],'action',"my-atc-" + vm.opponent[num2].position.x + '-' + vm.opponent[num2].position.y)
    }
    else {
      vm.$set(vm.opponent[num1],'action',"op-atc-" + vm.my[num2].position.x + '-' + vm.my[num2].position.y)
    }
    setTimeout(await function() {
      vm.damage(str,num1,num2,1.8)
    },400)
    if (str==='op') vm.$set(vm.my[num1],'vigour',0)
    else vm.$set(vm.opponent[num1],'vigour',0)
  },
  async function(vm,str,num1,num2){//skill 2 单体攻击2.1倍
    if (str==='op'){
      vm.$set(vm.my[num1],'action',"my-atc-" + vm.opponent[num2].position.x + '-' + vm.opponent[num2].position.y)
    }
    else {
      vm.$set(vm.opponent[num1],'action',"op-atc-" + vm.my[num2].position.x + '-' + vm.my[num2].position.y)
    }
    setTimeout(await function() {
      vm.damage(str,num1,num2,2.1)
    },400)
    if (str==='op') vm.$set(vm.my[num1],'vigour',0)
    else vm.$set(vm.opponent[num1],'vigour',0)
  },
  async function(vm,str,num1,num2) {//skill 3 群体攻击0.7倍
    if (str==='op'){
      // vm.$set(vm.opponent[num1],'action',"op-atc-" + vm.my[num2].position.x + '-' + vm.my[num2].position.y)
      setTimeout(await function() {
        vm.opponent.forEach((item,index)=>{
          vm.damage(str,num1,index,0.7)
        })
      },400)
      vm.my[num1].vigour=0
    }
    else {
      // vm.$set(vm.opponent[num1],'action',"op-atc-" + vm.my[num2].position.x + '-' + vm.my[num2].position.y)
      setTimeout(await function() {
        vm.my.forEach((item,index)=>{
          vm.damage(str,num1,index,0.7)
        })
      },400)
      vm.opponent[num1].vigour=0
    }
  }
]
