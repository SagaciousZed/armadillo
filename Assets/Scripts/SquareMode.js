#pragma strict
public var speed : float;
public var jump : float;
public var isground : float;
function Start () {

}

function FixedUpdate () {

      if (Input.GetAxis ("Horizontal"))
    	{rigidbody.AddRelativeForce(Vector3.left * speed * Input.GetAxis ("Horizontal"));
    	 
    	}
    if (isground == 1){
   	 if (Input.GetButton("Jump")){
    	rigidbody.AddRelativeForce(Vector3.up * jump, ForceMode.Impulse);
    	}
    	}

}

function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag == "ground"){
		isground = 1;
	}


}
function OnCollisionExit(collision : Collision) {
	if(collision.gameObject.tag == "ground"){
		isground = 0;
	}


}