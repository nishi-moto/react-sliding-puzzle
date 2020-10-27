function Tile(props) {

  const tileOnClickHandler = () => {
    props.moveHandler(props.correctPosition);
  }

  return (  
    <div className="Tile"  onClick={tileOnClickHandler}>
      v: { props.currentPosition !== null ? props.currentPosition : null}
      <br/>
      k: { props.correctPosition !== null ? props.correctPosition : null}
    </div>
  );
}

export default Tile;
