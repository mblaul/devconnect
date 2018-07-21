import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	onDeleteClick(e) {
		this.props.deleteAccount();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let dashboardContent;

		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			// Check if logged in user has profile data
			//// Check to see if profile object has any keys in it
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome{" "}
							<Link to={`/profile/${profile.handle}`}> {user.name} </Link>
						</p>
						<div className="btn-group mb-4" role="group">
							<a href="./edit-profile" className="btn btn-light">
								<i className="fas fa-user-circle text-info mr-1" /> Edit Profile
							</a>
							<a href="/add-experience" className="btn btn-light">
								<i className="fab fa-black-tie text-info mr-1" />
								Add Experience
							</a>
							<a href="/add-education" className="btn btn-light">
								<i className="fas fa-graduation-cap text-info mr-1" />
								Add Education
							</a>
						</div>
						<ProfileActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />
						<div style={{ marginBottom: "60px" }} />
						<button
							onClick={this.onDeleteClick.bind(this)}
							className="btn btn-danger"
						>
							Delete My Account
						</button>
					</div>
				);
			} else {
				// User is logged in but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted"> Welcome {user.name} </p>
						<p>
							You have not set up a profile yet, please add some information.
						</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4"> Dashboard </h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);
