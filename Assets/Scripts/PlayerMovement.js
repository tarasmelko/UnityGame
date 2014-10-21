#pragma strict

public var turnSmoothing : float = 7f;     // A smoothing value for turning the player.
public var speedDampTime : float = 15f;    // The damping for the speed parameter
var moveTouchPad : Joystick;

private var anim : Animator;                // Reference to the animator component.            // Reference to the HashIDs.


function Awake ()
{
    // Setting up the references.
    anim = GetComponent(Animator);
    anim.SetLayerWeight(0, 1f);
}


function FixedUpdate ()
{
   // Cache the inputs.
   var h : float = Input.GetAxis("Horizontal");
 // var v : float = Input.GetAxis("Vertical"); 
  //  MovementManagement(h,v);
    MovementManagement(moveTouchPad.position.x, moveTouchPad.position.y);
}


function MovementManagement (horizontal : float, vertical : float)
{    
    // If there is some axis input...
    if(horizontal != 0f || vertical != 0f)
    {
        // ... set the players rotation and set the speed parameter to 5.5f.
        Rotating(horizontal, vertical);
        anim.SetFloat(Animator.StringToHash("Speed"), 5.5f, speedDampTime, Time.deltaTime);
    }
    else
        // Otherwise set the speed parameter to 0.
        anim.SetFloat(Animator.StringToHash("Speed"), 0);
}


function Rotating (horizontal : float, vertical : float)
{
    // Create a new vector of the horizontal and vertical inputs.
    var targetDirection : Vector3 = new Vector3(horizontal, 0f, vertical);
    
    // Create a rotation based on this new vector assuming that up is the global y axis.
    var targetRotation : Quaternion = Quaternion.LookRotation(targetDirection, Vector3.up);
    
    // Create a rotation that is an increment closer to the target rotation from the player's rotation.
    var newRotation : Quaternion = Quaternion.Lerp(rigidbody.rotation, targetRotation, turnSmoothing * Time.deltaTime);
    
    // Change the players rotation to this new rotation.
    rigidbody.MoveRotation(newRotation);
}