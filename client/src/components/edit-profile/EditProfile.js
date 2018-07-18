import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: "",
			company: "",
			website: "",
			location: "",
			status: "",
			skills: "",
			githubusername: "",
			bio: "",
			twitter: "",
			facebook: "",
			linkedin: "",
			youtube: "",
			instagram: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;

			//Bring skills array back to CSV
			const skillsCSV = profile.skills.join(",");

			// If profile field doesn't exist make it an empty string
			profile.company = !isEmpty(profile.company) ? profile.company : "";
			profile.website = !isEmpty(profile.website) ? profile.website : "";
			profile.location = !isEmpty(profile.location) ? profile.location : "";
			profile.githubusername = !isEmpty(profile.githubusername)
				? profile.githubusername
				: "";
			profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : "";
			profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : "";
			profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : "";
			profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : "";
			profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : "";

			// Set component fields state
			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: skillsCSV,
				githubusername: profile.githubusername,
				bio: profile.bio,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				youtube: profile.youtube,
				instagram: profile.instagram
			});
		}
	}

	// static getDerivedStateFromProps = nextProps => {
	// 	return { errors: nextProps.errors };
	// };

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	onSubmit(e) {
		e.preventDefault();

		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};

		this.props.createProfile(profileData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="Youtube Profile URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="Instagram Profile URL"
						name="Instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			);
		}
		// Select options for professional status
		const options = [
			{ label: "* Select Professional Status", value: 0 },
			{ label: "Developer", value: "Developer" },
			{ label: "Junior Developer", value: "Junior Developer" },
			{ label: "Senior Developer", value: "Senior Developer" },
			{ label: "Manager", value: "Manager" },
			{ label: "Student", value: "Student" },
			{ label: "Instructor", value: "Instructor" },
			{ label: "Intern", value: "Intern" },
			{ label: "Other", value: "Other" }
		];
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Edit Your Profile</h1>
							<p className="lead text-center">Let's change that profile!</p>
							<small className="d-block pb-3"> * = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique name for your profile URL. Your full name, company name, nickname, ETC."
								/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info="Please select your experience level"
								/>
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Could be your own company or one you work for"
								/>
								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Your personal or company website"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City or city and state suggested (e.g. Boston, MA)"
								/>
								<TextFieldGroup
									placeholder="* Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma separated values (e.g. HTML, CSS, Javascript, PHP)"
								/>
								<TextFieldGroup
									placeholder="GitHub Username"
									name="githubusername"
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info="If you want your latest repos and a GitHub link please include your username"
								/>
								<TextAreaFieldGroup
									placeholder="Short Bio"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Please use comma separated values (e.g. HTML, CSS, Javascript, PHP)"
								/>
								<div className="mb-3">
									<button
										type="button"
										onClick={() => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}));
										}}
										className="btn btn-light"
									>
										Add Social Network Links
									</button>
									<span className="text muted">Optional</span>
								</div>
								{socialInputs}
								<input
									type="submit"
									value="Submit"
									className="btn btn-info btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createProfile, getCurrentProfile }
)(EditProfile);
