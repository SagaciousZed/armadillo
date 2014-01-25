#pragma strict
var RotSpeed : float;
function Start () {

}

function FixedUpdate () {
transform.Rotate(Vector3.up ,Time.deltaTime * RotSpeed);

}