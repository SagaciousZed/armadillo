#pragma strict
var BloodFX : Transform;
public var speed : float;
public var jump : float;
public var isground : boolean;
public var diespeed : float;
var orientationWidget : Transform;
var audiocamera : Transform;

public var objectSpeed : float;

private var animator : Animator;
public var spikes : GameObject;

enum ArmaMode {Cube, Ball, Spike};
var mode : ArmaMode;

function Start () {
	mode = ArmaMode.Cube;
	animator = GetComponentInChildren(Animator);
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
		animator.SetBool("curled", false);
		animator.SetBool("spiked", false);
		moveGroundTo(0);
		transform.parent = null;
		rigidbody.isKinematic = false;
		audiocamera.audio.volume = 0;
		
	}
	if (mode == ArmaMode.Ball){
		GetComponent(BoxCollider).enabled = false;
		GetComponent(SphereCollider).enabled = true;
		animator.SetBool("curled", true);
		animator.SetBool("spiked", false);
		rigidbody.drag = 0.1;
		moveGroundTo(-10);
		transform.parent = null;
		rigidbody.isKinematic = false;
	}

	
	if (mode == ArmaMode.Spike) {
		animator.SetBool("curled", false);
		animator.SetBool("spiked", true);
	}
	
	// lets just hide the spikes when we don't need them
	spikes.active = animator.GetBool("spiked");
	
	// quck and dirty self righting
	if (isground && mode != ArmaMode.Ball) {
		//var destination = Vector3(transform.rotation.eulerAngles.x, transform.rotation.eulerAngles.y, 0);
//		destination.z = 0;
	
		transform.rotation = Quaternion.Lerp(transform.rotation, orientationWidget.rotation, Time.deltaTime * 20);
//		var realrot : Quaternion = Quaternion(0,0,0,0);
//		realrot.eulerAngles = Vector3(0, 0, rotationup.rotation.eulerAngles.z); 
//		transform.rotation = Quaternion.Lerp(transform.rotation, realrot, Time.deltaTime * 20);
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
	var hIn : float = Input.GetAxis ("Horizontal");
	animator.SetBool("walking", hIn != 0);

	if (mode != ArmaMode.Ball){
		if (isground){
			rigidbody.AddForce(Vector3.right * speed * Input.GetAxis ("Horizontal"));
			if (hIn > 0) {
				orientationWidget.rotation.eulerAngles = Vector3.zero;
			} else if ( hIn < 0) {
				orientationWidget.rotation.eulerAngles = Vector3(0, 180, 0);
			}

			if (Input.GetButton("Jump")){
				rigidbody.AddForce(Vector3.up * jump, ForceMode.Impulse);
			}
		}
		else if (!isground){
			if (Input.GetAxis ("Horizontal")) {
				rigidbody.AddForce(Vector3.right * speed * .1 * Input.GetAxis ("Horizontal"));
			}
		}
	}

}

function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag == "ground"){
		isground = true;
		if (mode != ArmaMode.Ball){
			if (mode == ArmaMode.Cube){
				rigidbody.drag = 4;
			}
			else if (mode == ArmaMode.Spike){
				rigidbody.drag = 7;
			}
		// Call death for smacking into things to hard
		if (rigidbody.velocity.magnitude >= diespeed){
				Die ();
			}
		}
	}
	if(collision.gameObject.tag == "sticky"){
		
		if (mode == ArmaMode.Spike){
			transform.parent = collision.transform;
			rigidbody.isKinematic = true;
			//rigidbody.velocity = rigidbody.velocity * 0;
			
		}
	}
}




function OnCollisionExit(collision : Collision) {
	if(collision.gameObject.tag == "ground"){
		isground = false;
		if (mode != ArmaMode.Ball){
		rigidbody.drag = 2;
		}
	}


}
function Die (){
	BloodFX.gameObject.active = true;
	//Instantiate(BloodFX, transform.position, Quaternion.identity);
	audio.Play ();
	Destroy (this);
}
