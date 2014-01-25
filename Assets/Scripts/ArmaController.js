#pragma strict
public var speed : float;
public var jump : float;
public var isground : float;
var charMod : Transform;

public var objectSpeed : float;

enum ArmaMode {Cube, Ball, Spike};
var mode : ArmaMode;

function Start () {
	mode = ArmaMode.Cube;
}
function Update () {
	if (Input.GetKey("1")) {
		mode = ArmaMode.Cube;
	} else if (Input.GetKey("2")) {
		mode = ArmaMode.Ball;
	} if (Input.GetKey("3")) {
		mode = ArmaMode.Spike;
	}
	
	if (mode == ArmaMode.Cube){
		GetComponent(BoxCollider).enabled = true;
		GetComponent(SphereCollider).enabled = false;
		charMod.GetComponent(Animator).enabled = false;
		moveGroundTo(0);
	}
	if (mode == ArmaMode.Ball){
		GetComponent(BoxCollider).enabled = false;
		GetComponent(SphereCollider).enabled = true;
		charMod.GetComponent(Animator).enabled = true;
		rigidbody.drag = 0.1;
		moveGroundTo(-3);
	}

}

function moveGroundTo(pos : float) {
		var objects : GameObject[] = GameObject.FindGameObjectsWithTag("movingGround");
		for (var i = 0; i < objects.Length; i++) {
			var o = objects[i];
			//objects[i].transform.position.y = pos;
			o.transform.position = Vector3.Lerp(o.transform.position, Vector3(0, pos, 0), objectSpeed * Time.deltaTime);
		}
}

function FixedUpdate () {

if (mode != ArmaMode.Ball){
	if (isground == 1){
		if (Input.GetAxis ("Horizontal"))
		{rigidbody.AddForce(Vector3.right * speed * Input.GetAxis ("Horizontal"));

		}
		if (Input.GetButton("Jump")){
			rigidbody.AddForce(Vector3.up * jump, ForceMode.Impulse);
		}
	}
}

}

function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag == "ground"){
		isground = 1;
		if (mode != ArmaMode.Ball){
			rigidbody.drag = 5;
		}
	}


}
function OnCollisionExit(collision : Collision) {
	if(collision.gameObject.tag == "ground"){
		isground = 0;
		if (mode != ArmaMode.Ball){
		rigidbody.drag = 2;
		}
	}


}