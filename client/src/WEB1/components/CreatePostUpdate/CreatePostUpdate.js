import React from "react";
import axios from "axios";

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: null,
      idUpdate: null,
      nameUpdateCreate: null,
      nameButton: "",
      // dataUpdate: {
      //   photoContent_1: "",
      //   photoContent_2: "",
      //   photoCover: "",
      //   product_description_1: "",
      //   product_description_2: "",
      //   product_name: "",
      //   product_price: "",
      //   product_slug: "",
      //   product_summary: "",
      // },

      photoContent_1: "",
        photoContent_2: "",
        photoCover: "",
        product_description_1: "",
        product_description_2: "",
        product_name: "",
        product_price: "",
        product_slug: "",
        product_summary: "",
    };
    this.handleChangePostName = this.handleChangePostName.bind(this);
    this.handleChangePostSummary = this.handleChangePostSummary.bind(this);
    this.handleChangePostDescription1 = this.handleChangePostDescription1.bind(this);
    this.handleChangePostProductPrice = this.handleChangePostProductPrice.bind(this);
    this.apiUpdate = this.apiUpdate.bind(this);
  }
  componentDidMount() {
    const slug = this.props.location.pathname.split("/");
    const id = slug[2];
    // console.log(slug[1]);
    if (slug[1] === "update-post") {
      axios.get("/getPost/" + id).then((response) => {
        this.setState({
          isUpdate: true,
          idUpdate: id,
          nameUpdateCreate: "Update A Post",
          nameButton: "Update",
         // dataUpdate: response.data.data,
         photoContent_1: "",
         photoContent_2: "",
         photoCover: "",
         product_description_1: response.data.data.product_description_1,
         product_description_2: "",
         product_name: response.data.data.product_name,
         product_price: response.data.data.product_price,
         product_slug: "",
         product_summary:response.data.data.product_summary,
        });
      });
    }
    if (slug === "/create-post") {
      this.state.nameUpdateCreate = "Create A Post";
    }
  }
  //Xu ly update title: Duc Long
  handleChangePostName(event) {
    this.setState({product_name: event.target.value, });
  }
  //Xu ly update sumaary: Duc Long => Tổng quan về bài viết.
  handleChangePostSummary(event){
    this.setState({ product_summary: event.target.value,});
  }
  //Xu ly update descript: Duc Long
  handleChangePostDescription1(event){
    this.setState({product_description_1: event.target.value,});
  }
  //Xu ly price: Duc Long
  handleChangePostProductPrice(event){
    this.setState({product_price: event.target.value,});
  }

  //Submit vs api: Duc Long
  apiUpdate(event) {
    event.preventDefault();
    axios
      .post("/update-post/" + this.state.idUpdate, {
        product_name: this.state.product_name,
        product_summary: this.state.product_summary,
        product_description_1: this.state.product_description_1,
        product_price: this.state.product_price,

        _id: this.state.idUpdate,
      })
      .then((response) => {
        console.log(response);
      });
  }
  render() {
    if (this.state.dataUpdate) {
      console.log(this.state.dataUpdate);
    }
    return (
      <div className="container custom-container">
        <div className="row">
          <div className="box-create-post">
            <h1>{this.state.nameUpdateCreate}</h1>
            <form
              onSubmit={this.apiUpdate}
              className="form-create-product"
              method="post"
              encType="multipart/form-data"
            >
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="form-group">
                    <label htmlFor="product_name">Product Title: </label>
                    <input
                      className="form-control"
                      id="product_name"
                      type="text"
                      name="product_name"
                      defaultValue={this.state.product_name}
                      onChange={this.handleChangePostName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_summary">Product Summary: </label>
                    <input
                      className="form-control"
                      id="product_summary"
                      type="text"
                      name="product_summary"
                      defaultValue={this.state.product_summary}
                      onChange={this.handleChangePostSummary}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoCover">Choose one photoCover:</label>
                    <input
                      id="photoCover"
                      type="file"
                      accept="image/*"
                      name="photoCover"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_description_1">
                      Product content 1:
                    </label>
                    <textarea
                      className="product_description form-control"
                      id="product_description_1"
                      name="product_description_1"
                      cols="100"
                      rows="5"
                      defaultValue={this.state.product_description_1}
                      onChange = {this.handleChangePostDescription1}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoContent_1">
                      Choose one photo for content 1:
                    </label>
                    <input
                      id="photoContent_1"
                      type="file"
                      accept="image/*"
                      name="photoContent_1"
                    />
                  </div>
                  <div className="btn btn-success btnPlus">Plus 1 Content</div>
                  <div className="form-group">
                    <label id="idSeeImg" htmlFor="xao">
                      Choose many photos:
                    </label>
                    <input id="photos" type="file" name="images" multiple="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_price">Product Price: </label>
                    <input
                      className="form-control"
                      id="product_price"
                      type="text"
                      name="product_price"
                      defaultValue={this.state.product_price}
                      onChange ={this.handleChangePostProductPrice}
                    />
                  </div>
                  <button
                    className="btn btn-success btn-hoa-wait"
                    type="submit"
                  >
                    {this.state.nameButton}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CreatePost;
