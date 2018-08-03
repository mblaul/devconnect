import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class PostItem extends Component {
	render() {
		const { post, auth } = this.props;

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<a href="profile.html">
							<img
								className="rounded-circle d-none d-md-block"
								src={post.avatar}
								alt=""
							/>
						</a>
						<br />
						<p className="text-center">John Doe</p>
					</div>
					<div className="col-md-10">
						<p className="lead">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
							possimus corporis sunt necessitatibus! Minus nesciunt soluta
							suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
							dolor? Illo perferendis eveniet cum cupiditate aliquam?
						</p>
						<button type="button" className="btn btn-light mr-1">
							<i className="text-info fas fa-thumbs-up" />
							<span className="badge badge-light">4</span>
						</button>
						<button type="button" className="btn btn-light mr-1">
							<i className="text-secondary fas fa-thumbs-down" />
						</button>
						<a href="post.html" className="btn btn-info mr-1">
							Comments
						</a>
						<button type="button" className="btn btn-danger mr-1">
							<i className="fas fa-times" />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

PostItem.PropTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PostItem);
