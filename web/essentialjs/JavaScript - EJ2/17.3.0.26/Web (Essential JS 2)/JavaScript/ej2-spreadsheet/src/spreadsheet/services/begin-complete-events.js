/**
 *  Begin and complete events.

 */
var BeginCompleteEvents = /** @class */ (function () {
    /**
     * Constructor for initializing actioncomplete service.
     */
    function BeginCompleteEvents(parent) {
        this.parent = parent;
        this.initializeActionBegin();
        this.initializeActionComplete();
    }
    BeginCompleteEvents.prototype.initializeActionBegin = function () {
        var _this = this;
        var cellFormat = this.parent.beforeCellFormat;
        this.parent.beforeCellFormat = function (args) {
            if (cellFormat) {
                cellFormat.apply(_this, [args]);
            }
            _this.beginAction(args, 'cellFormat');
        };
        var beforeOpen = this.parent.beforeOpen;
        this.parent.beforeOpen = function (args) {
            if (beforeOpen) {
                beforeOpen.apply(_this, [args]);
            }
            _this.beginAction(args, 'beforeOpen');
        };
        var beforeSave = this.parent.beforeSave;
        this.parent.beforeSave = function (args) {
            if (beforeSave) {
                beforeSave.apply(_this, [args]);
            }
            _this.beginAction(args, 'beforeSave');
        };
        var beforeSort = this.parent.beforeSort;
        this.parent.beforeSort = function (args) {
            if (beforeSort) {
                beforeSort.apply(_this, [args]);
            }
            _this.beginAction(args, 'beforeSort');
        };
    };
    BeginCompleteEvents.prototype.initializeActionComplete = function () {
        var _this = this;
        var sortComplete = this.parent.sortComplete;
        this.parent.sortComplete = function (args) {
            if (sortComplete) {
                sortComplete.apply(_this, [args]);
            }
            _this.completeAction(args, 'sorting');
        };
        var cellSave = this.parent.cellSave;
        this.parent.cellSave = function (args) {
            if (cellSave) {
                cellSave.apply(_this, [args]);
            }
            if (args.oldValue !== args.value) {
                _this.completeAction(args, 'cellSave');
            }
        };
    };
    BeginCompleteEvents.prototype.beginAction = function (args, action) {
        this.parent.trigger('actionBegin', { action: action, args: args });
    };
    BeginCompleteEvents.prototype.completeAction = function (args, action) {
        this.parent.trigger('actionComplete', { action: action, eventArgs: args });
    };
    return BeginCompleteEvents;
}());
export { BeginCompleteEvents };
