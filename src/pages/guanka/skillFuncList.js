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
      vm.skillN = 7
      setTimeout(await function() {
        vm.opponent.forEach((item,index)=>{
          vm.damage(str,num1,index,0.7)
        })
      },400)
      vm.my[num1].vigour=0
    }
    else {
      vm.skillN = 8
      setTimeout(await function() {
        vm.my.forEach((item,index)=>{
          vm.damage(str,num1,index,0.7)
        })
      },400)
      vm.opponent[num1].vigour=0
    }
  },

  async function(vm,str,num1,num2) {//skill 4 群体攻击1.0倍
    if (str==='op'){
      vm.skillN = 7
      setTimeout(await function() {
        vm.opponent.forEach((item,index)=>{
          vm.damage(str,num1,index,1)
        })
      },400)
      vm.my[num1].vigour=0
    }
    else {
      vm.skillN = 8
      setTimeout(await function() {
        vm.my.forEach((item,index)=>{
          vm.damage(str,num1,index,1)
        })
      },400)
      vm.opponent[num1].vigour=0
    }
  },

  async function(vm,str,num1,num2) {//skill 5 群体攻击1.3倍

    if (str==='op'){
      vm.skillN = 7
      setTimeout(await function() {
        vm.opponent.forEach((item,index)=>{
          vm.damage(str,num1,index,1.3)
        })
      },400)
      vm.my[num1].vigour=0
    }
    else {
      vm.skillN = 8
      setTimeout(await function() {
        vm.my.forEach((item,index)=>{
          vm.damage(str,num1,index,1.3)
        })
      },400)
      vm.opponent[num1].vigour=0
    }
  },

  async function(vm,str,num1,num2) {//skill 6 最后一排攻击1.3倍
      let num 
      let list
      if (str==='op'){
        list = vm.opponent
      }
      else list = vm.my
      list.forEach(item=>{ //判断最后一排是哪一排
        if(item.position.x === 3){
          num = 3
        }
        else if(item.position.x === 2){
          num = 2
        }
        else num = 1
      })
      if (str==='op'){
        vm.setSkillN(4-num)
        setTimeout(await function() {
          vm.opponent.forEach((item,index)=>{
            if(item.position.x === num){
              vm.damage(str,num1,index,1.3)
            }
          })
        },400)
        vm.my[num1].vigour=0
      }
      else {
        vm.setSkillN(3+num)
        setTimeout(await function() {
          vm.my.forEach((item,index)=>{
            if(item.position.x === 3){
              vm.damage(str,num1,index,1.3)
            }
          })
        },400)
        vm.opponent[num1].vigour=0
      }
  },

  async function(vm,str,num1,num2) {//skill 7 最后一排攻击1.6倍
    let num 
    let list
    if (str==='op'){
      list = vm.opponent
    }
    else list = vm.my
    list.forEach(item=>{ //判断最后一排是哪一排
      if(item.position.x === 3){
        num = 3
      }
      else if(item.position.x === 2){
        num = 2
      }
      else num = 1
    })
    if (str==='op'){
      vm.setSkillN(4-num)
      setTimeout(await function() {
        vm.opponent.forEach((item,index)=>{
          if(item.position.x === num){
            vm.damage(str,num1,index,1.6)
          }
        })
      },400)
      vm.my[num1].vigour=0
    }
    else {
      vm.setSkillN(3+num)
      setTimeout(await function() {
        vm.my.forEach((item,index)=>{
          if(item.position.x === 3){
            vm.damage(str,num1,index,1.6)
          }
        })
      },400)
      vm.opponent[num1].vigour=0
    }
  },
  async function(vm,str,num1,num2) {//skill 8 最后一排攻击1.9倍
    let num 
    let list
    if (str==='op'){
      list = vm.opponent
    }
    else list = vm.my
    list.forEach(item=>{ //判断最后一排是哪一排
      if(item.position.x === 3){
        num = 3
      }
      else if(item.position.x === 2){
        num = 2
      }
      else num = 1
    })
    if (str==='op'){
      vm.setSkillN(4-num)
      setTimeout(await function() {
        vm.opponent.forEach((item,index)=>{
          if(item.position.x === num){
            vm.damage(str,num1,index,1.9)
          }
        })
      },400)
      vm.my[num1].vigour=0
    }
    else {
      vm.setSkillN(3+num)
      setTimeout(await function() {
        vm.my.forEach((item,index)=>{
          if(item.position.x === 3){
            vm.damage(str,num1,index,1.9)
          }
        })
      },400)
      vm.opponent[num1].vigour=0
    }
  }
]
