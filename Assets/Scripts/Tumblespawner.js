#pragma strict
var tumbleweed : Transform;
private var RoFClock : float = 0;
var Firerate : float;
var ShotScatter = 10;
function Start () {

}

function FixedUpdate () {

			if (Time.time > RoFClock){
		
			var Rx = Random.Range(-ShotScatter, ShotScatter);
			var Ry = Random.Range(-ShotScatter, ShotScatter);
		
		
			var weed = Instantiate(tumbleweed, transform.position, Quaternion.identity);
						
					
						weed.rigidbody.AddForce(transform.up * Rx);
						weed.rigidbody.AddForce(transform.right * Ry);
						
						
						RoFClock = Time.time + Firerate;
						
						}
						

}