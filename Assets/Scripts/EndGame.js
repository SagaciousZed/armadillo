#pragma strict

public var endGui : GameObject;

function OnCollisionEnter(collision : Collision) {
if(collision.gameObject.tag == "player"){


	Application.LoadLevel(0);
	}
}