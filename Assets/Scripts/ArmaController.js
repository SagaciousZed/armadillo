#pragma strict
var musicSquare : Transform;
var musicRound : Transform;
var musicSpikes : Transform;
var audioRoll : Transform;
var BloodFX : Transform;
public var speed : float;
public var jump : float;
public var isground : boolean;
public var diespeed : float;
var orientationWidget : Transform;

private var groundEulerAngles : Vector3;

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
		GetComponent(CapsuleCollider).enabled = true;
		GetComponent(SphereCollider).enabled = false;
		animator.SetBool("curled", false);
		animator.SetBool("spiked", false);
		moveGroundTo(0);
		transform.parent = null;
		rigidbody.isKinematic = false;
		musicSquare.audio.volume = 1.0;
		musicRound.audio.volume = 0.2;
		musicSpikes.audio.volume = 0.2;
		audioRoll.active= false;
	
		
		
	}
	if (mode == ArmaMode.Ball){
		GetComponent(CapsuleCollider).enabled = false;
		GetComponent(SphereCollider).enabled = true;
		animator.SetBool("curled", true);
		animator.SetBool("spiked", false);
		rigidbody.drag = 0.1;
		moveGroundTo(-10);
		transform.parent = null;
		rigidbody.isKinematic = false;
		musicSquare.audio.volume = 0.20;
		musicRound.audio.volume = 1.0;
		musicSpikes.audio.volume = 0.2;
		if (isground){
			if (rigidbody.velocity.magnitude >= .2){
			audioRoll.active= true;
			}
			else{
			audioRoll.active= false;
			}
			}
			
			
	}

	
	if (mode == ArmaMode.Spike) {
		animator.SetBool("curled", false);
		animator.SetBool("spiked", true);
		musicSquare.audio.volume = 0.20;
		musicRound.audio.volume = 0.2;
		musicSpikes.audio.volume = 1.0;
		audioRoll.active= false;
	}
	
	// lets just hide the spikes when we don't need them
	spikes.active = animator.GetBool("spiked");
	
	// quck and dirty self righting
	if (isground && mode != ArmaMode.Ball) {
		// point towards the camera widget
		transform.rotation = Quaternion.Lerp(transform.rotation, orientationWidget.rotation, Time.deltaTime * 20);
	}

}

private var originalPositions = Array();

class MovingGround {

	var ground : GameObject;
	var originalPosition : Vector3;
	
	function MovingGround(ground : GameObject, originalPosition : Vector3) {
		this.ground = ground;
		this.originalPosition = originalPosition;
	}
	
	function match(ground : GameObject) : boolean {
		return this.ground == ground;
	}

}

function find(ground : GameObject) : MovingGround {
	for (var i = 0; i < originalPositions.length; i++) {
		var mv : MovingGround = originalPositions[i];
		if (mv.match(ground)) {
			return mv;
		}
	}
	return null;
}

function moveGroundTo(pos : float) {
	var objects : GameObject[] = GameObject.FindGameObjectsWithTag("movingGround");
	for (var i = 0; i < objects.Length; i++) {
		var o = objects[i];
		
		var mvGnd : MovingGround = find(o);
		var newPosition : Vector3;
		if (pos == 0) {
			// if original position
			if (mvGnd == null) {
				mvGnd = MovingGround(o, o.transform.position);
				originalPositions.Add(mvGnd);
			} else {
				newPosition = mvGnd.originalPosition;
			}
		} else {
			newPosition = mvGnd.originalPosition;
			newPosition.y -= Mathf.Abs(o.GetComponentInChildren(Renderer).bounds.size.magnitude);
		}
		o.transform.position = Vector3.Lerp(o.transform.position, newPosition, objectSpeed * Time.deltaTime);
	}
}

function FixedUpdate () {



	var hIn : float = Input.GetAxis ("Horizontal");
	animator.SetBool("walking", hIn != 0);

	if (mode != ArmaMode.Ball){
		if (isground){
			rigidbody.AddForce(Vector3.right * speed * Input.GetAxis ("Horizontal"));
			
			var newZRotation = this.groundEulerAngles.z * Mathf.RoundToInt(hIn);
			if (hIn > 0) {
				orientationWidget.rotation.eulerAngles = Vector3(0, 0, newZRotation);
			} else if ( hIn < 0) {
				orientationWidget.rotation.eulerAngles = Vector3(0, 180, newZRotation);
			} else {
				orientationWidget.rotation.eulerAngles.z = newZRotation;
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

function isGroundType(s : String) : boolean {
	return s == "ground" || s == "movingGround";
}

function OnCollisionEnter(collision : Collision) {
	if(isGroundType(collision.gameObject.tag)){
		isground = true;
		//get the rotation of the ground
		groundEulerAngles = collision.gameObject.transform.rotation.eulerAngles;
		
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
