import React from "react";
import Modeler from "bpmn-js/lib/Modeler";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule
} from "bpmn-js-properties-panel";
import "./Model.css";

import sustainabilityExtension from "./resources/cloud_native_sustainability.json";
import customPropertiesProviderModule from "./customPropertiesProvider";

var document = require("./sustainability_1.0.0.json");

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
    this.propertiesPanel = React.createRef();
  }

  componentDidMount() {
    const { url, xml } = this.props;

    const container = this.ref.current;
    this.modeler = new Modeler({
      container,
      propertiesPanel: {
        parent: "#js-properties-panel"
      },
      moddleExtensions: {
        sustainability: sustainabilityExtension
      },
      additionalModules: [
        customPropertiesProviderModule,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule
      ]
    });

    this.modeler.on("import.done", (event) => {
      const { error, warnings } = event;

      if (error) {
        return this.handleError(error);
      }

      this.modeler.get("canvas").zoom("fit-viewport");

      return this.handleShown(warnings);
    });

    if (url) {
      return this.fetchDiagram(url);
    }

    if (xml) {
      return this.displayDiagram(xml);
    }
  }

  componentWillUnmount() {
    this.modeler.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this;

    if (props.url !== prevProps.url) {
      return this.fetchDiagram(props.url);
    }

    const currentXML = props.xml || state.xml;

    const previousXML = prevProps.xml || prevState.xml;

    if (currentXML && currentXML !== previousXML) {
      console.log(currentXML);
      return this.displayDiagram(currentXML);
    }
  }

  async displayDiagram(xml) {
    try {
      const { warnings } = await this.modeler.importXML(xml);

      console.log("Diagram import successful", warnings);
    } catch (err) {
      const { warnings } = err;

      console.log("Diagram import unsuccessful", err, warnings);
    }
  }

  fetchDiagram(url) {
    this.handleLoading();

    console.log(document);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(document)
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((text) => this.setState({ xml: text }))
      .catch((err) => this.handleError(err));
  }

  handleLoading() {
    const { onLoading } = this.props;

    if (onLoading) {
      onLoading();
    }
  }

  handleError(err) {
    const { onError } = this.props;

    if (onError) {
      onError(err);
    }

    console.log(err);
  }

  handleShown(warnings) {
    const { onShown } = this.props;

    if (onShown) {
      onShown(warnings);
    }
  }

  render() {
    return (
      <div>
        <div className="canvas" id="js-canvas" ref={this.ref} />
        <div
          className="properties-panel-parent"
          id="js-properties-panel"
          ref={this.propertiesPanel}
        />
      </div>
    );
  }
}

export default Model;
