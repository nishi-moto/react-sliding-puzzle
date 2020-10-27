function Tile(props) {

  const tileOnClickHandler = () => {
    props.moveHandler(props.correctPosition);
  }

  return (
    <div className="Tile" onClick={tileOnClickHandler}>
      <div className="TileContent"> {props.currentPosition !== null ? props.currentPosition + 1 : null}</div>
    </div>
  );
}

export default Tile;
