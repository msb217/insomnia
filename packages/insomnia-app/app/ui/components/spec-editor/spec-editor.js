// @flow
import * as React from 'react';
import autobind from 'autobind-decorator';
import CodeEditor from '../codemirror/code-editor';
import type { Workspace } from '../../../models/workspace';
import type { ApiSpec } from '../../../models/api-spec';

type Props = {|
  apiSpec: ApiSpec,
  workspace: Workspace,
  editorFontSize: number,
  editorIndentSize: number,
  lineWrapping: boolean,
  editorKeyMap: string,
  onChange: (spec: ApiSpec) => Promise<void>,
|};

@autobind
class SpecEditor extends React.PureComponent<Props> {
  async _handleOnChange(v: string) {
    const { apiSpec, onChange } = this.props;

    await onChange({
      ...apiSpec,
      contents: v,
    });
  }

  render() {
    const { editorFontSize, editorIndentSize, lineWrapping, editorKeyMap, apiSpec } = this.props;

    return (
      <div className="spec-editor theme--pane">
        <div className="spec-editor__header theme--pane__header">
          <h1>Edit API Specification</h1>
        </div>
        <div className="spec-editor__body theme--pane__body">
          <CodeEditor
            fontSize={editorFontSize}
            indentSize={editorIndentSize}
            lineWrapping={lineWrapping}
            keyMap={editorKeyMap}
            mode={apiSpec.contentType === 'json' ? 'application/json' : 'text/yaml'}
            defaultValue={apiSpec.contents}
            onChange={this._handleOnChange}
          />
        </div>
      </div>
    );
  }
}

export default SpecEditor;