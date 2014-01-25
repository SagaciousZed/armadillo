#pragma strict

public var horizontal : float = 100;
public var vertical : float = 50;

public var hasMaxSpeed : boolean = false;
public var maxSpeed : float = 20;

private var playerState : PlayerState;

// Use this for initialization
function Awake () {
	playerState = GetComponent(PlayerState);
}

function Update () {

	if (playerState.state == CreatureState.Normal) {
		// Get the input vector from keyboard or analog stick
		var directionVector = new Vector3(Input.GetAxis("Horizontal") * horizontal, Input.GetAxis("Vertical") * vertical, 0);
		constantForce.force = directionVector;
		
		if (hasMaxSpeed && rigidbody.velocity.magnitude > maxSpeed) {
	    	rigidbody.velocity = rigidbody.velocity.normalized * maxSpeed;
    	}
	}
	
}

// Require a PlayerState to be attached to the same game object
@script RequireComponent (PlayerState)
