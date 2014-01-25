#pragma strict
var player : Transform;
function Start () {

}

function FixedUpdate () {
transform.position = player.position;
}