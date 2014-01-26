#pragma strict

var target : Transform;
var hitFX1 : Transform;
var hitFX2 : Transform;
public var life : float;

function Awake () {
	Destroy (gameObject , life);
}

function FixedUpdate () {

	var angle = Quaternion.LookRotation(target.transform.position - transform.position);
		transform.rotation = Quaternion.Lerp(transform.rotation, angle, Time.deltaTime * 15);
}

function OnCollisionEnter(collision : Collision) {

	Instantiate(hitFX1, transform.position, transform.rotation);
	Instantiate(hitFX2, transform.position, transform.rotation);
		Destroy (gameObject);
}