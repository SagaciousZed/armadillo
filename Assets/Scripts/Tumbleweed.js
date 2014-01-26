#pragma strict
var loftup = .7;
var loftdwn = 0;
var Rnum :float;
var FX : Transform;
private var RoFClock : float = 0;
var Firerate : float;
function Awake ()
{
	Destroy (gameObject , 12);
}

function Start () {
var RRnum = Random.Range(loftdwn, loftup);
Rnum = RRnum;
}

function FixedUpdate () {

if (Time.time > RoFClock){

Instantiate(FX, transform.position, Quaternion.identity);
RoFClock = Time.time + Firerate;
						
						}

rigidbody.AddForce(Vector3.up * Rnum);

}