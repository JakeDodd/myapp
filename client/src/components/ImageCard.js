import React, { useEffect, useState, useCallback, useRef } from "react";

// class ImageCard extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = { spans: 0 };

//     this.imageRef = React.createRef();
//   }

//   componentDidMount() {
//     this.imageRef.current.addEventListener("load", this.setSpans);
//   }

//   componentWillUnmount() {
//     this.imageRef.current.removeEventListener("load", this.setSpans);
//   }

//   setSpans = () => {
//     const height = this.imageRef.current.clientHeight;

//     const spans = Math.ceil(height / 10);

//     this.setState({ spans });
//   };

//   render() {
//     const { description, urls } = this.props.image;

//     return (
//       <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
//         <img ref={this.imageRef} alt={description} src={urls.small} />
//       </div>
//     );
//   }
// }

const ImageCard = props => {
  const [spans, setSpans] = useState(0);

  const updateSpans = useCallback(() => {
    const height = imageRef.current.clientHeight;

    const span = Math.ceil(height / 10);

    setSpans(span);
  });

  const imageRef = useRef(null);

  useEffect(() => {
    imageRef.current.addEventListener("load", updateSpans);
    return () => {
      imageRef.current.removeEventListener("load", updateSpans);
    };
  }, []);

  const { description, urls } = props.image;

  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img ref={imageRef} alt={description} src={urls.small} />
    </div>
  );
};

export default ImageCard;
