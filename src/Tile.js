function Tile(props) {

  const tileOnClickHandler = () => {
    props.moveHandler(props.correctPosition);
  }

  return (  
    <div className="Tile"  onClick={tileOnClickHandler}>
      current position: { props.currentPosition !== null ? props.currentPosition : null}
      <br/>
      correct position: { props.correctPosition !== null ? props.correctPosition : null}
    </div>
  );
}

export default Tile;
