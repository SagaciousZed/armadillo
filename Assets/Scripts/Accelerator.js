#pragma strict

var character : GameObject;
var scale : float = 1.05;
var maxSpeed : float;

function Start () {

}

function Update () {

}

function OnTriggerStay (other) {
	if (character.GetComponent(ArmaController).mode == ArmaMode.Ball) {
		character.rigidbody.velocity = character.rigidbody.velocity * scale;
		if (maxSpeed > 0) {
			character.rigidbody.velocity = Vector3.ClampMagnitude(character.rigidbody.velocity, maxSpeed);
		}
	}
}