#pragma strict
var loftup = .7;
var loftdwn = 0;
var Rnum :float;

function Awake ()
{
	Destroy (gameObject , 12);
}

function Start () {
var RRnum = Random.Range(loftdwn, loftup);
Rnum = RRnum;
}

function FixedUpdate () {
rigidbody.AddForce(Vector3.up * Rnum);

}