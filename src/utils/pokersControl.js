
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
export default poker