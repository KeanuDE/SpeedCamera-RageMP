let config = require('./config.js');
let colshapes = [];
let maxSpeed = [];
let cObjects = [];



config.cameras.forEach((_camera) => {
  let object = mp.objects.new(_camera[0], _camera[1],
    {
        rotation: _camera[3],
        alpha: 250,
        dimension: _camera[2]
    });
  var _col = mp.colshapes.newCircle(_camera[1].x,_camera[1].y,_camera[4])
  colshapes.push(_col);
  maxSpeed.push(_camera[5]);
  cObjects.push(object);
 });


mp.events.add("playerEnterColshape",(player,shape) => {
  if(colshapes.includes(shape)) {
    if(player.vehicle != undefined) {
      var _maxSpeed = 0;
      colshapes.forEach((_shape,_id) => {
        if(_shape == shape) {
          _maxSpeed = maxSpeed[_id];
        }
      })
      player.call("sc:check",[_maxSpeed]);
    }
  }
});

mp.events.add("sc:check",(player,speed,max) => {
  if(speed > max) {
    player.notify("over max");
  }
});


mp.events.addCommand("placeSC",(player,fullText,max) => {
  if(max != undefined) {
    let object = mp.objects.new("prop_cctv_pole_04", new mp.Vector3(player.position.x,player.position.y,player.position.z - 1),
    {
        rotation: player.heading,
        alpha: 250,
        dimension: player.dimension
    });
    var _col = mp.colshapes.newCircle(player.position.x,player.position.y,config.mobileRadius);
    colshapes.push(_col);
    maxSpeed.push(parseInt(max));
    cObjects.push(object);
    player.outputChatBox(`New Speedcamera (ID: ${colshapes.length-1})`);
  }
});
mp.events.addCommand("removeSC",(player,fullText,id) => {

})