using UnityEngine;
using System.Collections;

public class Touch : MonoBehaviour {

	private Ray ray;
	private RaycastHit raycast = new RaycastHit();

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
				for (int i = 0; i< Input.touchCount; i++) {
						if (Input.GetTouch (i).phase == TouchPhase.Began) {
								ray = Camera.mainCamera.ScreenPointToRay (Input.GetTouch (i).position);
								if (Physics.Raycast (ray, out raycast)) {
										this.gameObject.transform.Rotate (0, 10, 0);
					raycast.transform.gameObject.SendMessage("OnTouchBegan3D");
								}

						}
				}
		}
	
}
