#pragma strict

public var isQuitButton : boolean = false;
public var hoverAudio : AudioSource;
public var onClickAudio : AudioSource;

function OnMouseEnter() {
	renderer.material.color = Color.red; //change the color of the text
	hoverAudio.Play();
}

function OnMouseExit() {
	renderer.material.color = Color.white; //change the colorï»¿ of the text
}

function OnMouseUp(){
    //Are We Dealing With A Quit Button
    if( isQuitButton ) {
        //QuitTheGame
        Application.Quit();
    } else {
        //LoadTheGame
        onClickAudio.Play();
       	yield WaitForSeconds(1);
        Application.LoadLevel(1);
    }
}

//@script RequireComponent(AudioSource)
