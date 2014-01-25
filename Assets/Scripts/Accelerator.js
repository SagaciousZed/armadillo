#pragma strict

var character : GameObject;
var scale : float = 1.05;

function Start () {

}

function Update () {

}

function OnTriggerStay (other) {
	if (character.GetComponent(ArmaController).mode == ArmaMode.Ball) {
		character.rigidbody.velocity = character.rigidbody.velocity * scale;
	}
}