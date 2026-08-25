/**
 * Created by IntelliJ IDEA.
 * User: Lipatov
 * Date: 10.04.12
 * Time: 16:56
 */
var Calculator = function() {
    // constants and enums
    this.Errors = {
        "UNBAL_BRACKETS": "Unbalanced brackets",
        "UNKNOWN_EXPRESSION" : "Unknown expression",
        "EXPRESSION_TOO_LONG" : "Expression is too long",
        "EMPTY_EXPRESSION" : "Expression is empty!",
        "DIVISION_BY_ZERO" : "Division by zero!",
        "SYNTAX_ERROR" : "Syntax error"
    }
    this.Types = {
        "NONE" : 0,
        "DELIMITER" : 1,
        "NUMBER" : 2
    };

    // variables
    this.idString = null;
    this.expression = null;
    this.storString = null;
    this.storToken = null;
    this.typeToken = this.Types.NONE;
}

Calculator.prototype.replaceAll = function(expression, search, replace) {
    return expression.split(search).join(replace);
}

Calculator.prototype.calculate = function(expression) {
    try {
        // cut all spaces
        this.expression = this.replaceAll(expression, " ", "");
        if(this.expression.length > 1024) {
            throw new Error(this.Errors.EXPRESSION_TOO_LONG);
        } else if(this.expression.length == 0) {
            throw new Error(this.Errors.EMPTY_EXPRESSION);
        }
        this.storString = this.expression.toLowerCase();
        this.idString = 0;
        this.getToken();
        if (this.storToken.length == 0) {
            throw new Error(this.Errors.EMPTY_EXPRESSION);
        }
        var result = new Operand();
        this.firstStepParsing(result);
        //alert(result.getValue());
        /*Number _temp = new Operand();
        firstStepParsing(_temp);
        if (storToken.intern() != "".intern()) {
            throw new ParserException(error.typeError.SYNTAX);
        }
        return Double.toString(_temp.get()); */
        return result.getValue();
    } catch(exception) {
        return exception.message;
    }
}

Calculator.prototype.firstStepParsing = function(result) {
    this.secondStepParsing(result);
    var token;
    while((token = this.storToken) == "+" || token == "-") {
        this.getToken();
        var temp = new Operand();
        this.secondStepParsing(temp);
        if(token == "-") {
            result.setValue(result.getValue() - temp.getValue());
        } else if(token == "+") {
            result.setValue(result.getValue() + temp.getValue());
        }
    }
}

Calculator.prototype.secondStepParsing = function(result) {
    this.thirdStepParsing(result);
    var token;
    while((token = this.storToken) == "*" || token == "/" || token == "%") {
        this.getToken();
        var temp = new Operand();
        this.thirdStepParsing(temp);
        if(token == "/") {
            if (temp.getValue() == 0.0) {
                throw new Error(this.Errors.DIVISION_BY_ZERO);
            }
            result.setValue(result.getValue() / temp.getValue());
        } else if(token == "%") {
            if (temp.getValue() == 0.0) {
                throw new Error(this.Errors.DIVISION_BY_ZERO);
            }
            result.setValue(result.getValue() % temp.getValue());
        } else if(token == "*") {
            result.setValue(result.getValue() * temp.getValue());
        }
    }

}

Calculator.prototype.thirdStepParsing = function(result) {
    this.fourthStepParsing(result);
    if (this.storToken == "^") {
        this.getToken();
        var temp = new Operand(0.0);
        this.fourthStepParsing(temp);
        result.setValue(Math.pow(result.getValue(), temp.getValue()));
    }
}

Calculator.prototype.fourthStepParsing = function(result) {
    var str = "";
    if ((this.typeToken == this.Types.DELIMITER) && (this.storToken == "+" || this.storToken == "-")) {
        str = this.storToken;
        this.getToken();
    }
    this.fifthStepParsing(result);
    if (str == "-") {
        result.setValue(result.getValue() - 2 * result.getValue());
    }
}

Calculator.prototype.fifthStepParsing = function(result) {
    if (this.storToken == "(") {
        this.getToken();
        this.firstStepParsing(result);
        if (this.storToken != ")") {
            throw new Error(this.Errors.UNBAL_BRACKETS);
        }
        this.getToken();
    } else {
        this.atom(result);
    }
}

Calculator.prototype.atom = function(result) {
    switch (this.typeToken) {
        case this.Types.NUMBER:
            result.setValue(this.storToken);
            this.getToken();
            return;
        default:
            throw new Error(this.Errors.SYNTAX_ERROR + result.getValue());
    }
}

Calculator.prototype.getToken = function() {
    this.typeToken = this.Types.NONE;
    this.storToken = "";
    if (this.idString.length == this.storString.length) {
        return;
    }

    if (this.isDelimiter(this.storString.charAt(this.idString))) {
        this.storToken = this.storString.charAt(this.idString);
        this.idString++;
        this.typeToken = this.Types.DELIMITER;
    } /*else if (Character.isLetter(storString.charAt(idString))) { //isLetter??
        int _ctrl = 0;
        while (!isDelimiter(storString.charAt(idString))) {
            strBuffer.append(storString.charAt(idString));
            idString++;
            if (idString >= storString.length()) {
                break;
            }
            _ctrl++;
            if(_ctrl >= 32) {
                throw new Error(Errors.UNKNOWN_EXPRESSION);
            }
        }
        if (idString < storString.length() && storString.charAt(idString) == '(') {
            typeToken = Types.FUNCTION;
        } else {
            typeToken = Types.VARIABLE;
        }
    }*/ else if(this.isDigit(this.storString.charAt(this.idString))) {
        while (!this.isDelimiter(this.storString.charAt(this.idString))) {
            this.storToken += this.storString.charAt(this.idString);
            this.idString++;
            if (this.idString >= this.storString.length) {
                break;
            }
        }
        this.typeToken = this.Types.NUMBER;
    }
}

Calculator.prototype.isDelimiter = function(delimiter) {
    return (" +-/\\*%^=(),".indexOf(delimiter) != -1) ? true : false;
}

Calculator.prototype.isDigit = function(digit) {
    return ("0123456789".indexOf(digit) != -1) ? true : false;
}


var Operand = function(value){
    this.value = (value === undefined) ? 0 : parseFloat(value);
}

Operand.prototype.getValue = function() {
    return parseFloat(this.value);
}

Operand.prototype.setValue = function(value) {
    this.value = parseFloat(value);
}


