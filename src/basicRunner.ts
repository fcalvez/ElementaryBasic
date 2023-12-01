export class ElbasInterpreter {
  readonly _log: (message: string) => void;
  readonly _info: (message: string) => void;
  readonly _debug: (message: string) => void;
  readonly _error: (message: string) => void;

  // line pointer
  private ptr = 0;
  readonly vars :{[key: string]: string} = {};
  readonly labels:{[key: string]: number} = {};

  public constructor(
    log: (message: string) => void,
    info: (message: string) => void,
    debug: (message: string) => void,
    error: (message: string) => void,
  ) {
    this._log = log;
    this._info = info;
    this._debug = debug;
    this._error = error;
  }

  public execute(lines: string[]): void {
    let terminated = false;

    while (!terminated) {
      const line = lines[this.ptr]?.trim();
      this._debug(`${this.ptr}>${line}`);

      // skip empty line
      if(line == undefined || line.length === 0) {
        this.ptr ++

      // parse line
      } else {
        // parse line and get program line increment
        this.parseLine(line);
      }

      // evaluate end condition
      if (this.ptr >= lines.length) {
        terminated = true;
      }
    }

    this._info("terminate");
  }

  // // comments
  static readonly inCommentReg = /\/\/.*$/;
  // var v0,v1,v2,...
  static readonly inVarReg = /^(?:var)\s+((?:\w|\s|,)+)/;
  // v0 <- v1 + ...
  static readonly inAssignReg = /^(\w+)\s*<-\s*(.+)/;
  // :label
  static readonly inLabelReg = /^:\s*(.+)/;
  // print xyz
  static readonly inPrintReg = /^print\s+(.*)/;
  // jumpto :label
  static readonly inJumptoReg = /^jumpto\s*:\s*(.+)/;

  private parseLine(line: string): void {

    let regResult : RegExpExecArray | null;

    /*
    // remove comments
    */
    line = line.replace(ElbasInterpreter.inCommentReg,"").trim();

    /*
    // var declaration
    */
    if((regResult = ElbasInterpreter.inVarReg.exec(line))) {
      const vars = regResult[1].split(",");
      vars.forEach(value => {
        const varName = value?.toLowerCase();
        if(value != undefined) {
          this.vars[varName] = "";

          this._debug(`  new var ${varName}`)
        }
      });

      this.ptr += 1;
      return;
    }

    /*
    // var affectation
    */
    if((regResult = ElbasInterpreter.inAssignReg.exec(line))) {
      const varName = regResult[1];
      if(this.vars[varName] == undefined) {
        this._error(`variable [${varName}] is not defined`);
        throw Error("var error");
      }
      const expression = regResult[2];
      const value = this.evaluateExpression(expression);
      this.vars[varName] = value;
      
      this._debug(`  affectation [${varName}] receive [${expression}]`);

      this.ptr += 1;
      return;
    }

    /*
    // label
    */
    if((regResult = ElbasInterpreter.inLabelReg.exec(line))) {
      const labelName = regResult[1];
      if(this.labels[labelName] != undefined && this.labels[labelName] !== this.ptr){
        this._error(`label [${labelName}] is already defined`);
        throw Error("label error");
      }
      // store program counter for this label
      this.labels[labelName] = this.ptr;

      this._debug(`  label [${labelName}] at line ${this.ptr}`);

      this.ptr += 1;
      return;
    }

    /*
    // print
    */
    if((regResult = ElbasInterpreter.inPrintReg.exec(line))) {
      const expression = regResult[1];
      const text = this.evaluateString(expression);
      this._log(text);

      this._debug(`  print text`);

      this.ptr += 1;
      return;
    }

    /*
    // jumpto
    */
    if((regResult = ElbasInterpreter.inJumptoReg.exec(line))) {
      const labelName = regResult[1]?.trim();
      if(this.labels[labelName] == undefined){
        this._error(`label [${labelName}] is not defined`);
        throw Error("label error");
      }
      // update program counter to this label
      this.ptr = this.labels[labelName];

      this._debug(`  jump to label [${labelName}] at line ${this.ptr}`);

      return;
    }

    /*
    // uknown instruction
    */
    this._error(`line [${this.ptr}] could not be decoded`);
    throw Error("syntax error");
}

  private evaluateString(expression:string) : string {
    // todo 
    return "text";
  }

  private evaluateExpression(expression:string) : string {
    // todo 
    return "1";
  }

  private assignValue(varName:string, value:string):void {
    // todo
  }
}

