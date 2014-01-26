#pragma strict
var spike1 : Transform;
var spike2: Transform;
var spike3 : Transform;
var spike4 : Transform;
var spike5 : Transform;
var spike6 : Transform;

function Start () {

}

function Update () {



}
function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == "player"){
		spike1.rigidbody.isKinematic = false;
		spike2.rigidbody.isKinematic = false;
		spike3.rigidbody.isKinematic = false;
		spike4.rigidbody.isKinematic = false;
		spike5.rigidbody.isKinematic = false;
		spike6.rigidbody.isKinematic = false;
		}
	}