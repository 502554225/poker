
var poker = {}
poker.toPoker=function(data)
{   
    var pokers = []
    data.forEach(item => {
        let poker = {
            pokerId:item.pokerId,
            pokerName:item.pokerName,
            life: item.life,
            aggressivity: item.aggressivity,//攻击力
            defenses: item.defenses,//防御力
            vigour: item.vigour,//气势
            crits: item.crits,//暴击
            indomitableness: item.indomitableness,//韧劲
            evade: item.evade,//闪避
            hit: item.hit,//命中
            skill: item.skill,//技能
            survival:item.survival,
            action:'',
            ascription:item.ascription,
            position:{
              x:item.positionX,
              y:item.positionY
            },
            level:item.level
          }
          pokers.push(poker)
    });
    return pokers;
}
poker.toDBPoker = function(data){
  var pokers = []
  data.forEach(item => {
    let poker = {
        pokerId:item.pokerId,
        pokerName:item.pokerName,
        life: item.life,
        aggressivity: item.aggressivity,//攻击力
        defenses: item.defenses,//防御力
        vigour: item.vigour,//气势
        crits: item.crits,//暴击
        indomitableness: item.indomitableness,//韧劲
        evade: item.evade,//闪避
        hit: item.hit,//命中
        skill: item.skill,//技能
        survival:item.survival,
        action:'',
        ascription:item.ascription,
        positionX:item.position.x,
        positiony:item.position.y,
        level:item.level
      }
      pokers.push(poker)
      
  });
  return pokers
}

poker.toDBArray = function(data){
  var pokers = []
  data.forEach(item => {
    let poker = {
        userId:item.userId,
        pokerId:item.pokerId,
        pokerName:item.pokerName,
        life: item.life,
        aggressivity: item.aggressivity,//攻击力
        defenses: item.defenses,//防御力
        vigour: item.vigour,//气势
        crits: item.crits,//暴击
        indomitableness: item.indomitableness,//韧劲
        evade: item.evade,//闪避
        hit: item.hit,//命中
        skill: item.skill,//技能
        survival:item.survival,
        action:'',
        ascription:item.ascription,
        positionX:item.position.x,
        positiony:item.position.y,
        level:item.level
      }
      pokers.push(poker)
      
  });
  return pokers
}

poker.computed=function(data)
{   
    var pokers = []
    data.forEach(item => {
        let level
        let j = 1
        for(let i = 1;i<=40;i++){
          j=j*i
          if(item.level<40*j){
            level = i
            break
          }
        }
        let poker = {
            pokerId:item.pokerId,
            pokerName:item.pokerName,
            life: Math.floor(item.life*(1+0.2*(level-1))*100)/100,
            aggressivity: Math.floor(item.aggressivity*(1+0.2*(level-1))*100)/100,//攻击力
            defenses: Math.floor(item.defenses*(1+0.2*(level-1))*100)/100,//防御力
            vigour: item.vigour,//气势
            crits:Math.floor( item.crits*(1+0.2*(level-1))*100)/100,//暴击
            indomitableness: Math.floor(item.indomitableness*(1+0.2*(level-1))*100)/100,//韧劲
            evade: Math.floor(item.evade*(1+0.2*(level-1))*100)/100,//闪避
            hit: Math.floor(item.hit*(1+0.2*(level-1))*100)/100,//命中
            skill: item.skill,//技能
            survival:item.survival,
            action:'',
            ascription:item.ascription,
            position:{
              x:item.position.x,
              y:item.position.y
            },
            level:level
          }
          pokers.push(poker)
    });
    return pokers;
}
export default poker