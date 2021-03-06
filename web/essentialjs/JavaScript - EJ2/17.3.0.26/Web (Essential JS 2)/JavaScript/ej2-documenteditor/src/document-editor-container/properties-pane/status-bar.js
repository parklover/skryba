import { createElement, L10n, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
/**
 * Represents document editor status bar.
 * @private
 */
var StatusBar = /** @class */ (function () {
    function StatusBar(parentElement, docEditor) {
        var _this = this;
        this.startPage = 1;
        this.initializeStatusBar = function () {
            var isRtl = _this.container.enableRtl;
            _this.documentEditor.enableSpellCheck = (_this.container.enableSpellCheck) ? true : false;
            // tslint:disable-next-line:max-line-length
            _this.localObj = new L10n('documenteditorcontainer', _this.container.defaultLocale, _this.container.locale);
            // tslint:disable-next-line:max-line-length
            var styles = 'padding-top:8px;';
            styles += isRtl ? 'padding-right:16px' : 'padding-left:16px';
            // tslint:disable-next-line:max-line-length
            var div = createElement('div', { className: (_this.container.enableSpellCheck) ? 'e-de-ctnr-pg-no' : 'e-de-ctnr-pg-no-spellout', styles: styles });
            _this.statusBarDiv.appendChild(div);
            var label = createElement('label');
            label.textContent = _this.localObj.getConstant('Page') + ' ';
            div.appendChild(label);
            // tslint:disable-next-line:max-line-length
            _this.pageNumberLabel = createElement('label', { styles: 'text-transform:capitalize;white-space:pre;overflow:hidden;user-select:none;cursor:text;height:17px;max-width:150px' });
            _this.editablePageNumber = createElement('div', { styles: 'display: inline-flex;height: 17px;padding: 0px 4px;', className: 'e-input e-de-pagenumber-text' });
            _this.editablePageNumber.appendChild(_this.pageNumberLabel);
            if (isRtl) {
                label.style.marginLeft = '6px';
                _this.editablePageNumber.style.marginLeft = '6px';
            }
            else {
                label.style.marginRight = '6px';
                _this.editablePageNumber.style.marginRight = '6px';
            }
            _this.updatePageNumber();
            div.appendChild(_this.editablePageNumber);
            // tslint:disable-next-line:max-line-length
            _this.editablePageNumber.setAttribute('title', _this.localObj.getConstant('The current page number in the document. Click or tap to navigate specific page.'));
            var label1 = createElement('label', { styles: 'width:16px' });
            label1.textContent = ' ' + _this.localObj.getConstant('of') + ' ';
            div.appendChild(label1);
            _this.pageCount = createElement('label');
            div.appendChild(_this.pageCount);
            _this.updatePageCount();
            if (_this.documentEditor.enableSpellCheck) {
                var verticalLine = createElement('div', { className: 'e-de-statusbar-seperator' });
                _this.statusBarDiv.appendChild(verticalLine);
                var spellCheckBtn = _this.addSpellCheckElement();
                _this.spellCheckButton.appendTo(spellCheckBtn);
            }
            var zoomBtn = createElement('button', {
                // tslint:disable-next-line:max-line-length
                className: (_this.container.enableSpellCheck) ? 'e-de-statusbar-zoom-spell' : 'e-de-statusbar-zoom', attrs: { type: 'button' }
            });
            _this.statusBarDiv.appendChild(zoomBtn);
            zoomBtn.setAttribute('title', 'Zoom level. Click or tap to open the Zoom options.');
            var items = [
                {
                    text: '200%',
                },
                {
                    text: '175%',
                },
                {
                    text: '150%',
                },
                {
                    text: '125%',
                },
                {
                    text: '100%',
                },
                {
                    text: '75%',
                },
                {
                    text: '50%',
                },
                {
                    text: '25%',
                },
                {
                    separator: true
                },
                {
                    text: _this.localObj.getConstant('Fit one page')
                },
                {
                    text: _this.localObj.getConstant('Fit page width'),
                },
            ];
            // tslint:disable-next-line:max-line-length
            _this.zoom = new DropDownButton({ content: '100%', items: items, enableRtl: _this.container.enableRtl, select: _this.onZoom }, zoomBtn);
        };
        this.onZoom = function (args) {
            _this.setZoomValue(args.item.text);
            _this.updateZoomContent();
        };
        this.onSpellCheck = function (args) {
            _this.setSpellCheckValue(args.item.text, args.element);
        };
        this.updateZoomContent = function () {
            _this.zoom.content = Math.round(_this.documentEditor.zoomFactor * 100) + '%';
        };
        this.setSpellCheckValue = function (text, element) {
            _this.spellCheckButton.content = 'Spelling';
            if (text.match(_this.localObj.getConstant('Spell Check'))) {
                _this.documentEditor.enableSpellCheck = (_this.documentEditor.enableSpellCheck) ? false : true;
                setTimeout(function () {
                    if (_this.documentEditor.enableSpellCheck) {
                        _this.documentEditor.spellChecker.languageID = _this.currentLanguage;
                        _this.documentEditor.spellChecker.allowSpellCheckAndSuggestion = _this.allowSuggestion;
                        _this.documentEditor.viewer.triggerElementsOnLoading = true;
                        _this.documentEditor.viewer.triggerSpellCheck = true;
                    }
                    _this.documentEditor.editor.reLayout(_this.documentEditor.viewer.selection);
                    /* tslint:disable */
                }, 50);
                /* tslint:enable */
                _this.documentEditor.viewer.triggerSpellCheck = false;
                _this.documentEditor.viewer.triggerElementsOnLoading = false;
                // tslint:disable-next-line:max-line-length
            }
            else if (text.match(_this.localObj.getConstant('Underline errors'))) {
                if (_this.documentEditor.enableSpellCheck) {
                    // tslint:disable-next-line:max-line-length
                    _this.documentEditor.spellChecker.removeUnderline = (_this.documentEditor.spellChecker.removeUnderline) ? false : true;
                    _this.documentEditor.editor.reLayout(_this.documentEditor.viewer.selection);
                }
            }
        };
        this.setZoomValue = function (text) {
            if (text.match(_this.localObj.getConstant('Fit one page'))) {
                _this.documentEditor.fitPage('FitOnePage');
            }
            else if (text.match(_this.localObj.getConstant('Fit page width'))) {
                _this.documentEditor.fitPage('FitPageWidth');
            }
            else {
                _this.documentEditor.zoomFactor = parseInt(text, 0) / 100;
            }
        };
        /**
         * Updates page count.
         */
        this.updatePageCount = function () {
            _this.pageCount.textContent = _this.editorPageCount.toString();
        };
        /**
         * Updates page number.
         */
        this.updatePageNumber = function () {
            _this.pageNumberLabel.textContent = _this.startPage.toString();
        };
        this.updatePageNumberOnViewChange = function (args) {
            if (_this.documentEditor.selection
                && _this.documentEditor.selection.startPage >= args.startPage && _this.documentEditor.selection.startPage <= args.endPage) {
                _this.startPage = _this.documentEditor.selection.startPage;
            }
            else {
                _this.startPage = args.startPage;
            }
            _this.updatePageNumber();
        };
        this.wireEvents = function () {
            _this.editablePageNumber.addEventListener('keydown', function (e) {
                if (e.which === 13) {
                    e.preventDefault();
                    var pageNumber = parseInt(_this.editablePageNumber.textContent, 0);
                    if (pageNumber > _this.editorPageCount) {
                        _this.updatePageNumber();
                    }
                    else {
                        if (_this.documentEditor.selection) {
                            _this.documentEditor.selection.goToPage(parseInt(_this.editablePageNumber.textContent, 0));
                        }
                        else {
                            _this.documentEditor.scrollToPage(parseInt(_this.editablePageNumber.textContent, 0));
                        }
                    }
                    _this.editablePageNumber.contentEditable = 'false';
                    if (_this.editablePageNumber.textContent === '') {
                        _this.updatePageNumber();
                    }
                }
                if (e.which > 64) {
                    e.preventDefault();
                }
            });
            _this.editablePageNumber.addEventListener('blur', function () {
                if (_this.editablePageNumber.textContent === '' || parseInt(_this.editablePageNumber.textContent, 0) > _this.editorPageCount) {
                    _this.updatePageNumber();
                }
                _this.editablePageNumber.contentEditable = 'false';
                _this.editablePageNumber.style.border = 'none';
            });
            _this.editablePageNumber.addEventListener('focus', function () {
                _this.editablePageNumber.style.border = '1px solid #F1F1F1';
            });
            _this.editablePageNumber.addEventListener('click', function () {
                _this.updateDocumentEditorPageNumber();
            });
        };
        this.updateDocumentEditorPageNumber = function () {
            _this.editablePageNumber.contentEditable = 'true';
            _this.editablePageNumber.focus();
            window.getSelection().selectAllChildren(_this.editablePageNumber);
        };
        this.statusBarDiv = parentElement;
        this.container = docEditor;
        this.initializeStatusBar();
        this.wireEvents();
    }
    Object.defineProperty(StatusBar.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatusBar.prototype, "editorPageCount", {
        get: function () {
            return this.documentEditor.pageCount;
        },
        enumerable: true,
        configurable: true
    });
    StatusBar.prototype.addSpellCheckElement = function () {
        var _this = this;
        var spellCheckBtn = createElement('button', {
            className: 'e-de-statusbar-spellcheck'
        });
        this.statusBarDiv.appendChild(spellCheckBtn);
        spellCheckBtn.setAttribute('title', 'Spell Checker options');
        var spellCheckItems = [
            {
                text: 'Spell Check',
            },
            {
                text: 'Underline errors',
            },
        ];
        // tslint:disable-next-line:max-line-length
        this.spellCheckButton = new DropDownButton({
            content: 'Spelling', items: spellCheckItems, enableRtl: this.container.enableRtl, select: this.onSpellCheck,
            beforeItemRender: function (args) {
                args.element.innerHTML = '<span></span>' + args.item.text;
                if (isNullOrUndefined(_this.currentLanguage)) {
                    _this.currentLanguage = _this.documentEditor.spellChecker.languageID;
                }
                if (isNullOrUndefined(_this.allowSuggestion)) {
                    _this.allowSuggestion = _this.documentEditor.spellChecker.allowSpellCheckAndSuggestion;
                }
                var span = args.element.children[0];
                if (args.item.text === 'Spell Check' && _this.documentEditor.enableSpellCheck) {
                    span.style.marginRight = '10px';
                    span.setAttribute('class', 'e-de-selected-spellcheck-item');
                    // tslint:disable-next-line:max-line-length
                }
                else if (args.item.text === 'Underline errors' && _this.documentEditor.enableSpellCheck && !_this.documentEditor.spellChecker.removeUnderline) {
                    span.style.marginRight = '10px';
                    span.setAttribute('class', 'e-de-selected-underline-item');
                }
                else {
                    span.style.marginRight = '25px';
                    args.element.children[0].classList.remove('e-de-selected-spellcheck-item');
                    args.element.children[0].classList.remove('e-de-selected-underline-item');
                }
            }
        });
        return spellCheckBtn;
    };
    /**
     * @private
     */
    StatusBar.prototype.destroy = function () {
        this.container = undefined;
        if (this.zoom) {
            this.zoom.destroy();
            this.zoom = undefined;
        }
        if (this.spellCheckButton) {
            this.spellCheckButton.destroy();
            this.spellCheckButton = undefined;
        }
    };
    return StatusBar;
}());
export { StatusBar };
