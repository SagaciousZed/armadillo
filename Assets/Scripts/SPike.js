#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag == "ground"){
			transform.parent = collision.transform;
			rigidbody.isKinematic = true;

			
		}
		if(collision.gameObject.tag == "player"){
			transform.parent = collision.transform;
			rigidbody.isKinematic = true;
			Destroy (gameObject , 3);

			
		}
		}