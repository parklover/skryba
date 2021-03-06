import { Browser } from '@syncfusion/ej2-base';
import { splitArrayCollection, processPathData } from '@syncfusion/ej2-drawings';
/**
 * The `FormFields` module is to render formfields in the PDF document.

 */
var FormFields = /** @class */ (function () {
    /**
     * @private
     */
    function FormFields(viewer, base) {
        // tslint:disable-next-line
        this.maintainTabIndex = {};
        // tslint:disable-next-line
        this.maintanMinTabindex = {};
        this.isSignatureField = false;
        this.pdfViewer = viewer;
        this.pdfViewerBase = base;
    }
    /**
     * @private
     */
    FormFields.prototype.renderFormFields = function (pageIndex) {
        this.maxTabIndex = 0;
        this.minTabIndex = -1;
        // tslint:disable-next-line
        var data = window.sessionStorage.getItem('formfields');
        if (data !== null) {
            // tslint:disable-next-line
            var formFieldsData = JSON.parse(data);
            var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
            var canvasElement = document.getElementById(this.pdfViewer.element.id + '_pageCanvas_' + pageIndex);
            if (formFieldsData !== null && canvasElement !== null && textLayer !== null) {
                for (var i = 0; i < formFieldsData.length; i++) {
                    // tslint:disable-next-line
                    var currentData = formFieldsData[i];
                    // tslint:disable-next-line
                    if (parseFloat(currentData['PageIndex']) == pageIndex) {
                        // tslint:disable-next-line
                        var inputField = this.createFormFields(currentData, pageIndex, i);
                        if (inputField) {
                            // tslint:disable-next-line
                            var bounds = currentData['LineBounds'];
                            // tslint:disable-next-line
                            var font = currentData['Font'];
                            this.applyPosition(inputField, bounds, font);
                            // tslint:disable-next-line
                            currentData['uniqueID'] = this.pdfViewer.element.id + 'input_' + pageIndex + '_' + i;
                            this.applyCommonProperties(inputField, pageIndex, i, currentData);
                            this.checkIsReadonly(currentData, inputField);
                            this.applyTabIndex(currentData, inputField, pageIndex);
                            this.checkIsRequiredField(currentData, inputField);
                            this.applyDefaultColor(inputField);
                            textLayer.appendChild(inputField);
                            inputField.addEventListener('focus', this.focusFormFields.bind(this));
                            inputField.addEventListener('blur', this.blurFormFields.bind(this));
                            inputField.addEventListener('click', this.updateFormFields.bind(this));
                            inputField.addEventListener('change', this.changeFormFields.bind(this));
                            inputField.addEventListener('keydown', this.updateFormFieldsValue.bind(this));
                        }
                    }
                }
                window.sessionStorage.removeItem('formfields');
                window.sessionStorage.setItem('formfields', JSON.stringify(formFieldsData));
            }
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    FormFields.prototype.downloadFormFieldsData = function () {
        // tslint:disable-next-line
        var data = window.sessionStorage.getItem('formfields');
        // tslint:disable-next-line
        var formFieldsData = JSON.parse(data);
        // tslint:disable-next-line
        var datas = {};
        for (var m = 0; m < formFieldsData.length; m++) {
            // tslint:disable-next-line
            var currentData = formFieldsData[m];
            if (currentData.Name === 'Textbox' || currentData.Name === 'Password' || currentData.Multiline) {
                datas[currentData.FieldName] = currentData.Text;
            }
            else if (currentData.Name === 'RadioButton' && currentData.Selected) {
                datas[currentData.GroupName] = currentData.Value;
            }
            else if (currentData.Name === 'CheckBox') {
                datas[currentData.GroupName] = currentData.Selected;
            }
            else if (currentData.Name === 'DropDown') {
                datas[currentData.Text] = currentData.SelectedValue;
            }
            else if (currentData.Name === 'ListBox') {
                // tslint:disable-next-line
                var childItems = currentData['TextList'];
                var childItemsText = [];
                for (var m_1 = 0; m_1 < currentData.SelectedList.length; m_1++) {
                    // tslint:disable-next-line
                    var currentElement = currentData.SelectedList[m_1];
                    childItemsText.push(childItems[currentElement]);
                }
                datas[currentData.Text] = JSON.stringify(childItemsText);
            }
            else if (currentData.Name === 'SignatureField') {
                // tslint:disable-next-line
                var collectionData = processPathData(currentData.Value);
                // tslint:disable-next-line
                var csData = splitArrayCollection(collectionData);
                datas[currentData.FieldName] = JSON.stringify(csData);
            }
        }
        return (JSON.stringify(datas));
    };
    FormFields.prototype.focusFormFields = function (event) {
        // tslint:disable-next-line
        var currentTarget = event.target;
        if (currentTarget && currentTarget.className !== 'e-pdfviewer-signatureformFields') {
            // tslint:disable-next-line
            var backgroundcolor = currentTarget.style.backgroundColor;
            // tslint:disable-next-line
            var currentIndex = backgroundcolor.lastIndexOf(',');
            // tslint:disable-next-line
            var currentColor = backgroundcolor.slice(0, currentIndex + 1) + 0 + ')';
            if (currentTarget.type === 'checkbox') {
                currentTarget.style.webkitAppearance = '';
            }
            currentTarget.style.backgroundColor = currentColor;
        }
        else if (currentTarget) {
            currentTarget.blur();
        }
    };
    FormFields.prototype.blurFormFields = function (event) {
        // tslint:disable-next-line
        var currentTarget = event.target;
        // tslint:disable-next-line
        var backgroundcolor = currentTarget.style.backgroundColor;
        // tslint:disable-next-line
        var currentIndex = backgroundcolor.lastIndexOf(',');
        // tslint:disable-next-line
        var currentColor = backgroundcolor.slice(0, currentIndex + 1) + 0.2 + ')';
        if ((currentTarget.type === 'checkbox') && !currentTarget.checked) {
            currentTarget.style.webkitAppearance = 'none';
        }
        else {
            currentTarget.style.webkitAppearance = '';
        }
        currentTarget.style.backgroundColor = currentColor;
    };
    FormFields.prototype.updateFormFields = function (event) {
        // tslint:disable-next-line
        var currentTarget = event.target;
        if (currentTarget.className === 'e-pdfviewer-ListBox') {
            currentTarget = currentTarget.parentElement;
            this.updateDataInSession(currentTarget);
        }
        else if (currentTarget.className === 'e-pdfviewer-signatureformFields') {
            this.currentTarget = currentTarget;
            this.pdfViewerBase.signatureModule.showSignatureDialog(true);
        }
    };
    /**
     * @private
     */
    FormFields.prototype.drawSignature = function () {
        var annot;
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        var currentWidth = parseFloat(this.currentTarget.style.width) / zoomvalue;
        var currentHeight = parseFloat(this.currentTarget.style.height) / zoomvalue;
        var currentLeft = parseFloat(this.currentTarget.style.left) / zoomvalue;
        var currentTop = parseFloat(this.currentTarget.style.top) / zoomvalue;
        var currentPage = parseFloat(this.currentTarget.id.split('_')[1]);
        annot = {
            // tslint:disable-next-line:max-line-length
            id: this.currentTarget.id, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: currentPage, data: this.pdfViewerBase.signatureModule.outputString, modifiedDate: '',
            shapeAnnotationType: 'Path', opacity: 1, rotateAngle: 0, annotName: '', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
        };
        this.pdfViewer.add(annot);
        // tslint:disable-next-line
        var canvass = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + currentPage);
        // tslint:disable-next-line
        this.pdfViewer.renderDrawing(canvass, currentPage);
        this.pdfViewerBase.signatureModule.showSignatureDialog(false);
        this.currentTarget.className = 'e-pdfviewer-signatureformFields signature';
        this.updateDataInSession(this.currentTarget, annot.data);
        this.currentTarget.style.pointerEvents = 'none';
    };
    FormFields.prototype.updateFormFieldsValue = function (event) {
        // tslint:disable-next-line
        var currentTarget = event.target;
        if (event.which === 9 && currentTarget && currentTarget.className === 'e-pdfviewer-formFields') {
            // tslint:disable-next-line
            var id = currentTarget.id.split('input_')[1].split('_')[0];
            if (this.maintainTabIndex[id] === currentTarget.tabIndex) {
                // tslint:disable-next-line
                var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + (parseInt(id) + 1));
                if (textLayer) {
                    // tslint:disable-next-line
                    var currentFields = textLayer.getElementsByClassName('e-pdfviewer-formFields');
                    if (currentFields && currentFields.length > 0) {
                        currentFields[0].focus();
                        event.preventDefault();
                    }
                }
                else {
                    var textLayer_1 = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + 0);
                    // tslint:disable-next-line
                    var currentFields = textLayer_1.getElementsByClassName('e-pdfviewer-formFields');
                    for (var m = 0; m < currentFields.length; m++) {
                        if (currentFields[m].tabIndex === this.maintanMinTabindex['0']) {
                            currentFields[m].focus();
                            event.preventDefault();
                            break;
                        }
                    }
                }
            }
            else {
                // tslint:disable-next-line
                var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + parseInt(id));
                // tslint:disable-next-line
                var currentFields = textLayer.getElementsByClassName('e-pdfviewer-formFields');
                var istabindexed = true;
                for (var m = 0; m < currentFields.length; m++) {
                    istabindexed = false;
                    if (currentFields[m].tabIndex === (currentTarget.tabIndex + 1)) {
                        currentFields[m].focus();
                        istabindexed = true;
                        event.preventDefault();
                        break;
                    }
                }
                var tabindex = currentTarget.tabIndex + 1;
                while (!istabindexed) {
                    for (var l = 0; l < currentFields.length; l++) {
                        istabindexed = false;
                        if (currentFields[l].tabIndex === (tabindex)) {
                            currentFields[l].focus();
                            istabindexed = true;
                            event.preventDefault();
                            break;
                        }
                    }
                    if (this.maintainTabIndex[id] === tabindex) {
                        istabindexed = true;
                    }
                    tabindex = tabindex + 1;
                }
            }
        }
    };
    FormFields.prototype.changeFormFields = function (event) {
        // tslint:disable-next-line
        var currentTarget = event.target;
        this.updateDataInSession(currentTarget);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    FormFields.prototype.updateDataInSession = function (target, signaturePath) {
        this.pdfViewerBase.isDocumentEdited = true;
        // tslint:disable-next-line
        var data = window.sessionStorage.getItem('formfields');
        // tslint:disable-next-line
        var FormFieldsData = JSON.parse(data);
        for (var m = 0; m < FormFieldsData.length; m++) {
            // tslint:disable-next-line
            var currentData = FormFieldsData[m];
            if (currentData.uniqueID === target.id) {
                if (target.type === 'text' || target.type === 'password' || target.type === 'textarea') {
                    var signField = target;
                    if (signField.classList.contains('e-pdfviewer-signatureformFields')) {
                        currentData.Value = signaturePath;
                    }
                    else {
                        currentData.Text = target.value;
                    }
                }
                else if (target.type === 'radio') {
                    for (var l = 0; l < FormFieldsData.length; l++) {
                        // tslint:disable-next-line
                        var currentType = FormFieldsData[l];
                        if (FormFieldsData[l].GroupName === target.name) {
                            FormFieldsData[l].Selected = false;
                        }
                    }
                    currentData.Selected = true;
                }
                else if (target.type === 'checkbox') {
                    if (target.checked) {
                        currentData.Selected = true;
                    }
                    else {
                        currentData.Selected = false;
                    }
                }
                else if (target.type === 'select-one') {
                    // tslint:disable-next-line
                    var currentValue = target.options[target.selectedIndex].text;
                    // tslint:disable-next-line
                    var childrens = target.children;
                    var isChildElements = false;
                    for (var k = 0; k < childrens.length; k++) {
                        if (childrens[k].text === currentValue) {
                            currentData.SelectedValue = currentValue;
                        }
                    }
                }
                else if (target.type === 'select-multiple') {
                    // tslint:disable-next-line
                    var currentValue = target.selectedOptions;
                    currentData.SelectedList = [];
                    for (var z = 0; z < currentValue.length; z++) {
                        // tslint:disable-next-line
                        var childrens = target.children;
                        for (var k = 0; k < childrens.length; k++) {
                            if (childrens[k] === currentValue[z]) {
                                currentData.SelectedList.push(k);
                            }
                        }
                    }
                }
                break;
            }
            else if (target && target.getAttribute('list') != null && target.type === 'text' && currentData.uniqueID === target.list.id) {
                currentData.SelectedValue = target.value;
            }
        }
        window.sessionStorage.removeItem('formfields');
        window.sessionStorage.setItem('formfields', JSON.stringify(FormFieldsData));
    };
    // tslint:disable-next-line
    FormFields.prototype.applyCommonProperties = function (inputdiv, pageIndex, index, currentData) {
        // tslint:disable-next-line
        var inputField = document.getElementById(this.pdfViewer.element.id + 'input_' + pageIndex + '_' + index);
        if (inputField) {
            inputField.remove();
        }
        if (currentData.IsSignatureField && this.isSignatureField) {
            inputdiv.className = 'e-pdfviewer-signatureformFields signature';
            inputdiv.style.pointerEvents = 'none';
        }
        else if (currentData.IsSignatureField) {
            inputdiv.className = 'e-pdfviewer-signatureformFields';
        }
        else {
            inputdiv.className = 'e-pdfviewer-formFields';
        }
        inputdiv.id = this.pdfViewer.element.id + 'input_' + pageIndex + '_' + index;
        inputdiv.style.zIndex = 1000;
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    FormFields.prototype.createFormFields = function (currentData, pageIndex, index, printContainer) {
        // tslint:disable-next-line
        var currentField;
        // tslint:disable-next-line
        switch (currentData['Name']) {
            case 'Textbox':
                currentField = this.createTextBoxField(currentData, pageIndex, 'text');
                break;
            case 'Password':
                currentField = this.createTextBoxField(currentData, pageIndex, 'password');
                break;
            case 'RadioButton':
                currentField = this.createRadioBoxField(currentData, pageIndex, 'radio');
                break;
            case 'CheckBox':
                currentField = this.createRadioBoxField(currentData, pageIndex, 'checkbox', printContainer);
                break;
            case 'DropDown':
                currentField = this.createDropDownField(currentData, pageIndex, index, printContainer);
                break;
            case 'ListBox':
                currentField = this.createListBoxField(currentData, pageIndex);
                break;
            case 'SignatureField':
                currentField = this.createSignatureField(currentData, pageIndex, index, printContainer);
                if (currentData.Value && currentData.Value !== '') {
                    this.renderExistingAnnnot(currentData, index, printContainer);
                }
                break;
        }
        return currentField;
    };
    // tslint:disable-next-line
    FormFields.prototype.createTextBoxField = function (data, pageIndex, type) {
        // tslint:disable-next-line
        var inputField;
        if (data.Visible === 1) {
            return;
        }
        if (data.Multiline) {
            inputField = document.createElement('textarea');
            inputField.style.resize = 'none';
        }
        else {
            inputField = document.createElement('input');
            inputField.type = type;
        }
        if (data.MaxLength > 0) {
            inputField.maxLength = data.MaxLength;
        }
        this.addAlignmentPropety(data, inputField);
        if (data.Text !== '') {
            inputField.value = data.Text;
        }
        else {
            inputField.value = '';
        }
        inputField.name = data.FieldName;
        return inputField;
    };
    // tslint:disable-next-line
    FormFields.prototype.checkIsReadonly = function (data, inputField) {
        if (data.IsReadonly) {
            inputField.disabled = true;
            inputField.style.cursor = 'default';
            inputField.style.backgroundColor = 'none';
        }
        else {
            // tslint:disable-next-line
            var borderColor = data.BackColor;
            inputField.style.backgroundColor = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 0.2 + ')';
            inputField.style.color = 'black';
        }
    };
    // tslint:disable-next-line
    FormFields.prototype.applyTabIndex = function (data, inputField, pageIndex) {
        inputField.tabIndex = data.TabIndex;
        this.maxTabIndex = Math.max(this.maxTabIndex, inputField.tabIndex);
        if (this.minTabIndex === -1) {
            this.minTabIndex = inputField.tabIndex;
        }
        this.minTabIndex = Math.min(this.minTabIndex, inputField.tabIndex);
        this.maintainTabIndex[pageIndex.toString()] = this.maxTabIndex;
        this.maintanMinTabindex[pageIndex.toString()] = this.minTabIndex;
    };
    // tslint:disable-next-line
    FormFields.prototype.checkIsRequiredField = function (data, inputField) {
        if (data.IsRequired) {
            inputField.required = true;
            inputField.style.border = '1px solid red';
        }
        else {
            // tslint:disable-next-line
            var borderColor = data.BorderColor;
            inputField.style.border = data.BorderWidth;
            inputField.style.borderColor = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 1 + ')';
        }
        if (inputField.type !== 'checkbox' && inputField.type !== 'radio') {
            inputField.style.borderStyle = 'solid';
        }
    };
    // tslint:disable-next-line
    FormFields.prototype.applyDefaultColor = function (inputField) {
        if (inputField.style.backgroundColor === 'rgba(255, 255, 255, 0.2)' || inputField.style.backgroundColor === 'rgba(0, 0, 0, 0.2)') {
            inputField.style.backgroundColor = 'rgba(0, 20, 200, 0.2)';
        }
    };
    // tslint:disable-next-line
    FormFields.prototype.addAlignmentPropety = function (data, inputField) {
        // tslint:disable-next-line
        var alignment = data.Alignment;
        switch (alignment) {
            case 0:
                inputField.style.textAlign = 'left';
                break;
            case 1:
                inputField.style.textAlign = 'center';
                break;
            case 2:
                inputField.style.textAlign = 'right';
                break;
            case 3:
                inputField.style.textAlign = 'justify';
                break;
        }
    };
    // tslint:disable-next-line
    FormFields.prototype.createRadioBoxField = function (data, pageIndex, type, printContainer) {
        // tslint:disable-next-line
        var inputField = document.createElement('input');
        inputField.type = type;
        if (data.Selected) {
            inputField.checked = true;
        }
        else if (type === 'checkbox' && !printContainer) {
            inputField.style.webkitAppearance = 'none';
        }
        inputField.name = data.GroupName;
        inputField.value = data.Value;
        return inputField;
    };
    // tslint:disable-next-line
    FormFields.prototype.createDropDownField = function (data, pageIndex, index, printContainer) {
        // tslint:disable-next-line
        var inputField = document.createElement('select');
        // tslint:disable-next-line
        var childItems = data['TextList'];
        if (data.Selected && !printContainer) {
            // tslint:disable-next-line
            var previousField = document.getElementById('editableDropdown' + pageIndex + '_' + index);
            if (previousField) {
                previousField.remove();
            }
            // tslint:disable-next-line
            var inputFields = document.createElement('input');
            inputFields.id = 'editableDropdown' + pageIndex + '_' + index;
            inputFields.setAttribute('list', this.pdfViewer.element.id + 'input_' + pageIndex + '_' + index);
            // tslint:disable-next-line
            var bounds = data['LineBounds'];
            // tslint:disable-next-line
            var font = data['Font'];
            this.applyPosition(inputFields, bounds, font);
            inputFields.style.backgroundColor = 'rgba(0, 20, 200, 0.2)';
            inputFields.className = 'e-pdfviewer-formFields';
            if (data.selectedIndex === -1) {
                inputFields.value = data.SelectedValue;
            }
            if (printContainer) {
                printContainer.appendChild(inputFields);
            }
            else {
                var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
                textLayer.appendChild(inputFields);
            }
            inputFields.addEventListener('focus', this.focusFormFields.bind(this));
            inputFields.addEventListener('blur', this.blurFormFields.bind(this));
            inputFields.addEventListener('click', this.updateFormFields.bind(this));
            inputFields.addEventListener('change', this.changeFormFields.bind(this));
            inputFields.addEventListener('keydown', this.updateFormFieldsValue.bind(this));
            inputField = document.createElement('DATALIST');
        }
        for (var j = 0; j < childItems.length; j++) {
            // tslint:disable-next-line
            var option = document.createElement('option');
            option.className = 'e-dropdownSelect';
            if (data.SelectedValue === childItems[j]) {
                option.selected = true;
            }
            else {
                option.selected = false;
            }
            option.innerHTML = childItems[j];
            inputField.appendChild(option);
        }
        inputField.name = data.Text;
        return inputField;
    };
    // tslint:disable-next-line
    FormFields.prototype.createListBoxField = function (data, pageIndex) {
        // tslint:disable-next-line
        var inputField = document.createElement('select');
        inputField.multiple = true;
        // tslint:disable-next-line
        var childItems = data['TextList'];
        for (var j = 0; j < childItems.length; j++) {
            // tslint:disable-next-line
            var option = document.createElement('option');
            option.className = 'e-pdfviewer-ListBox';
            for (var k = 0; k < data.SelectedList.length; k++) {
                if (data.SelectedList[k] === j) {
                    option.selected = true;
                }
            }
            option.innerHTML = childItems[j];
            inputField.appendChild(option);
        }
        inputField.name = data.Text;
        return inputField;
    };
    // tslint:disable-next-line
    FormFields.prototype.createSignatureField = function (data, pageIndex, index, printContainer) {
        // tslint:disable-next-line
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.name = data.FieldName;
        // tslint:disable-next-line
        var previousField = document.getElementById('signIcon' + pageIndex + '_' + index);
        if (previousField && !printContainer) {
            previousField.remove();
        }
        // tslint:disable-next-line
        var span = document.createElement('span');
        var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
        // tslint:disable-next-line
        var bounds = data['LineBounds'];
        // tslint:disable-next-line
        var font = data['Font'];
        var left = this.ConvertPointToPixel(bounds.X);
        var top = this.ConvertPointToPixel(bounds.Y);
        span.style.position = 'absolute';
        span.id = 'signIcon' + pageIndex + '_' + index;
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        span.style.left = left * zoomvalue + 'px';
        span.style.top = top * zoomvalue + 'px';
        if (Browser.isDevice) {
            span.style.height = 5 + 'px';
            span.style.width = 10 + 'px';
            span.style.fontSize = '3px';
        }
        else {
            span.style.height = 10 + 'px';
            span.style.width = 19 + 'px';
            span.style.fontSize = '8px';
        }
        span.style.padding = '2px';
        span.style.textAlign = 'center';
        span.style.boxSizing = 'content-box';
        span.innerHTML = 'Sign';
        span.style.backgroundColor = 'red';
        textLayer.appendChild(span);
        this.addSignaturePath(data);
        return inputField;
    };
    // tslint:disable-next-line
    FormFields.prototype.addSignaturePath = function (signData) {
        this.isSignatureField = false;
        // tslint:disable-next-line
        var data = window.sessionStorage.getItem('formfields');
        // tslint:disable-next-line
        var formFieldsData = JSON.parse(data);
        for (var m = 0; m < formFieldsData.length; m++) {
            // tslint:disable-next-line
            var currentData = formFieldsData[m];
            if (currentData.Name === 'ink' && currentData.FieldName === signData.FieldName && signData.Value !== '') {
                signData.Value = currentData.Value;
                this.isSignatureField = true;
                break;
            }
        }
        return this.isSignatureField;
    };
    // tslint:disable-next-line
    FormFields.prototype.applyPosition = function (inputField, bounds, font) {
        if (bounds) {
            var left = this.ConvertPointToPixel(bounds.X);
            var top_1 = this.ConvertPointToPixel(bounds.Y);
            var width = this.ConvertPointToPixel(bounds.Width);
            var height = this.ConvertPointToPixel(bounds.Height);
            var fontHeight = 0;
            if (font !== null && font.Height) {
                inputField.style.fontfamily = font.Name;
                if (font.Italic) {
                    inputField.style.fontStyle = 'italic';
                }
                if (font.Bold) {
                    inputField.style.fontWeight = 'Bold';
                }
                fontHeight = this.ConvertPointToPixel(font.Size);
            }
            this.setStyleToTextDiv(inputField, left, top_1, fontHeight, width, height, false);
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line:max-line-length
    FormFields.prototype.setStyleToTextDiv = function (textDiv, left, top, fontHeight, width, height, isPrint) {
        textDiv.style.position = 'absolute';
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        if (isPrint) {
            zoomvalue = 1;
        }
        textDiv.style.left = left * zoomvalue + 'px';
        textDiv.style.top = top * zoomvalue + 'px';
        textDiv.style.height = height * zoomvalue + 'px';
        textDiv.style.width = width * zoomvalue + 'px';
        textDiv.style.margin = '0px';
        if (fontHeight > 0) {
            textDiv.style.fontSize = fontHeight * zoomvalue + 'px';
        }
    };
    // tslint:disable-next-line
    FormFields.prototype.renderExistingAnnnot = function (data, index, printContainer) {
        if (!printContainer) {
            // tslint:disable-next-line
            var bounds = data['LineBounds'];
            var currentLeft = this.ConvertPointToPixel(bounds.X);
            var currentTop = this.ConvertPointToPixel(bounds.Y);
            var currentWidth = this.ConvertPointToPixel(bounds.Width);
            var currentHeight = this.ConvertPointToPixel(bounds.Height);
            // tslint:disable-next-line
            var currentPage = parseFloat(data['PageIndex']);
            var annot = void 0;
            annot = {
                // tslint:disable-next-line:max-line-length
                id: this.pdfViewer.element.id + 'input_' + currentPage + '_' + index, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: currentPage, data: data.Value, modifiedDate: '',
                shapeAnnotationType: 'Path', opacity: 1, rotateAngle: 0, annotName: '', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
            };
            this.pdfViewer.add(annot);
            // tslint:disable-next-line
            var canvass = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + currentPage);
            // tslint:disable-next-line
            this.pdfViewer.renderDrawing(canvass, currentPage);
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    FormFields.prototype.ConvertPointToPixel = function (number) {
        return (number * (96 / 72));
    };
    /**
     * @private
     */
    FormFields.prototype.destroy = function () {
        window.sessionStorage.removeItem('formfields');
    };
    /**
     * @private
     */
    FormFields.prototype.getModuleName = function () {
        return 'FormFields';
    };
    return FormFields;
}());
export { FormFields };
