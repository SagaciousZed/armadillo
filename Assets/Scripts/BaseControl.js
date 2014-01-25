#pragma strict

static var BaseHP : float = 100;
static var ResourceCount : float = 150;
static var ScoreNumber : float = 0;
static var EventNumber : float = 1;

var ResourceClock : float = 0;
var ResourceInterval : float = 1;

var ScoreClock : float = 0;
var ScoreInterval : float = 0.5;

var EventClock : float = 15;
var EventInterval : float = 15;

function Start () {

}

function FixedUpdate () {

//Basic resource control
	if (Time.time > ResourceClock){
			ResourceCount = (ResourceCount + 1);

		ResourceClock = (Time.time + ResourceInterval);
	}
//Basic Score Control
	if (Time.time > ScoreClock){
			ScoreNumber = (ScoreNumber + 1);

		ScoreClock = (Time.time + ScoreInterval);
	}
	
//Event Control
	if (Time.time > EventClock){
			EventNumber = (EventNumber + 1);

		EventClock = (Time.time + EventInterval);
	}


}
function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == "ED1"){
		BaseHP = (BaseHP - 1);
	}
	if(other.gameObject.tag == "ED2"){
		BaseHP = (BaseHP - 2);
	}
	if(other.gameObject.tag == "ED3"){
		BaseHP = (BaseHP - 3);
	}
	if(other.gameObject.tag == "ED4"){
		BaseHP = (BaseHP - 4);
	}
	if(other.gameObject.tag == "ED5"){
		BaseHP = (BaseHP - 5);
	}
	if(other.gameObject.tag == "EnemyG"){
		BaseHP = (BaseHP - 5);
		Destroy (other.gameObject);
	}
		if(other.gameObject.tag == "EnemyA"){
		BaseHP = (BaseHP - 2);
		//Destroy (other.gameObject);
	}
}