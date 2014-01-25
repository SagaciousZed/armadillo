public var yaw = 13;
public var roll = 15;
public var rudder = 10;


function Start () {

}

function FixedUpdate () {
   

    
      if (Input.GetAxis ("Horizontal"))
    	{rigidbody.AddRelativeTorque(Vector3.left * roll * Input.GetAxis ("Horizontal"));
    	 
    	} 
 
    if (Input.GetAxis("Vertical"))
    	{rigidbody.AddRelativeTorque(Vector3.forward * -yaw * Input.GetAxis ("Vertical"));
 		}
 	if(Input.GetKey(KeyCode.E))
 		{rigidbody.AddRelativeTorque(Vector3.up * rudder );
 		}       
	if(Input.GetKey(KeyCode.Q))
 		{rigidbody.AddRelativeTorque(Vector3.down * rudder );
 		} 
        
       
       
    
    
}




     
   