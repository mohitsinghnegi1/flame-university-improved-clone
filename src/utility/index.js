import React from "react";
import "../css/preloader.css";

function Loader(props) {
	return (
		<>
			<span
				id='loaderSpan'
				className='spinner-border spinner-border-sm'
				role='status'
				aria-hidden='true'
				style={{ marginRight: 5 }}
			/>
			{props.text}...
		</>
	);
}

function PageHeader(props) {
	return (
		<>
			<h3 className='app-page-header'>{props.name}</h3>
			<div className='page-header-border-bottom' />
		</>
	);
}

function CustomOverlay(props) {
	if (props.show) {
		return (
			<div id='overlay'>
				<div id='text'>
					<span
						id='loaderSpan'
						className='spinner-border spinner-border-sm'
						role='status'
						aria-hidden='true'
						style={{ marginRight: 5, width: 25, height: 25 }}
					/>
					<span style={{ fontSize: 30 }}> {props.text}...</span>
				</div>
			</div>
		);
	} else {
		return null;
	}
}

function AppPreLoader(props) {
	if (props.show) {
		console.log("preloader working");
		return (
			<div
				id='formPreLoader'
				className='preloader d-flex align-items-center justify-content-center'
			>
				<div className='lds-hourglass' />
			</div>
		);
	} else {
		return null;
	}
}

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, info) {
		// Display fallback UI

		this.setState({ hasError: true });
		// You can also log the error to an error reporting service
		//logErrorToMyService(error, info);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}
		return this.props.children;
	}
}

export { Loader, PageHeader, CustomOverlay, AppPreLoader, ErrorBoundary };
