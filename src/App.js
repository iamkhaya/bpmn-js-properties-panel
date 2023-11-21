import "./styles.css";
import Model from "./Model";

export default function App() {
  return (
    <div className="App">
      <Model
        xml={
          '<?xml version="1.0" encoding="UTF-8"?><bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:bpmncns="http://cloud-native-sustainability/schema/bpmn/cns" targetNamespace="http://bpmn.io/schema/bpmn"><bpmn:process id="Process_1"><bpmn:task id="Task_0" name="Greeter" bpmncns:optional="true" bpmncns:executionModality="highPerformance" /></bpmn:process><bpmndi:BPMNDiagram id="Diagram_1"><bpmndi:BPMNPlane id="Plane_1" bpmnElement="Process_1"><bpmndi:BPMNShape id="Task_0_di" bpmnElement="Task_0"><dc:Bounds x="160" y="80" width="100" height="80" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>'
        }
      />
    </div>
  );
}
