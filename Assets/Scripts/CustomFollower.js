public var following : GameObject; // setup in project

var springiness : float = 1;

function FixedUpdate() {
    // smooth follow
    var x : float = following.transform.position.x;
    var y : float = transform.position.y;
    var z : float = transform.position.x;
    this.transform.position.x = Vector3.Lerp(transform.position, Vector3(x, y, z), Time.deltaTime * springiness).x;
}
