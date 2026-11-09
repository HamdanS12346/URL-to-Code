// Stand-ins for the Kendo widgets that are not in kendo-ui-core (Grid, Window, DateTimePicker), registered the way the real
// ones are (kendo.ui.plugin + data-role), with the markup the client portal's probe recorded (docs/provider-probe/09, 10).
// Only for the offline test portal (npm run smoke:provider). Never part of a rebuild.
(function ($, kendo) {
  const ui = kendo.ui;
  const svg = (d) => `<svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="${d}"></path></svg>`;
  const register = (W) => { ui.plugin(W); ui.roles[W.fn.options.name.toLowerCase()] = W; };

  // ---- Grid: header + body + pager, data from a DataSource read by POST ----
  const Grid = ui.Widget.extend({
    init: function (element, options) {
      ui.Widget.fn.init.call(this, element, options);
      const o = this.options;
      this.columns = o.columns;
      this.dataSource = new kendo.data.DataSource(o.dataSource);
      this.dataSource.bind('change', () => this.refresh());
      const el = this.element.addClass('k-grid').attr('data-role', 'grid');
      const th = o.columns.map((c, i) => `<th class="k-table-th k-header${o.sortable && c.sortable !== false ? ' clickable' : ''}" data-field="${c.field}" data-index="${i}" data-title="${c.title}" role="columnheader" aria-sort="none"><span class="k-cell-inner"><span class="grid-col-hdr-cell"><span class="k-link"><span class="k-column-title clickable">${c.title}</span></span></span>${o.sortable && c.sortable !== false ? '<span class="grid-sort-icon-cell"><i class="fa-solid fa-caret-up grid-col-sort-ind-icon"></i></span>' : ''}</span></th>`).join('');
      el.html(`<div class="k-grid-header"><div class="k-grid-header-wrap"><table role="none" class="k-grid-header-table k-table"><thead class="k-table-thead"><tr class="k-table-row">${th}</tr></thead></table></div></div>` +
        `<div class="k-grid-content k-auto-scrollable"><table class="k-grid-table k-table" role="none"><tbody class="k-table-tbody"><tr class="k-grid-norecords"><td colspan="${o.columns.length}">${o.noRecords || 'No records available.'}</td></tr></tbody></table></div>` +
        `<div class="k-pager k-grid-pager" data-role="pager"><div class="k-pager-numbers-wrap"><button class="k-button k-pager-nav k-button-flat k-icon-button k-disabled k-pager-first" data-page="1" aria-label="Go to the first page"><span class="k-icon k-svg-icon k-button-icon">${svg('M352 384 160 256l192-128zM128 128v256h32V128z')}</span></button><button class="k-button k-pager-nav k-button-flat k-icon-button k-disabled" data-page="1" aria-label="Go to the previous page"><span class="k-icon k-svg-icon k-button-icon">${svg('m160 256 192-128v256z')}</span></button><div class="k-pager-numbers"><button aria-current="page" class="k-button k-button-flat k-button-primary k-selected" data-page="1"><span class="k-button-text">1</span></button></div><button class="k-button k-pager-nav k-button-flat k-icon-button" data-page="2" aria-label="Go to the next page"><span class="k-icon k-svg-icon k-button-icon">${svg('M352 256 160 384V128z')}</span></button><button class="k-button k-pager-nav k-button-flat k-icon-button k-pager-last" data-page="1" aria-label="Go to the last page"><span class="k-icon k-svg-icon k-button-icon">${svg('m128 128 192 128-192 128zm224 256V128h-32v256z')}</span></button></div><span class="k-pager-info k-label">0 - 0 of 0 items</span><button class="k-pager-refresh k-button k-button-flat k-icon-button" title="Refresh"><span class="k-icon k-svg-icon k-button-icon">${svg('M256 64v64a128 128 0 1 0 128 128h64A192 192 0 1 1 256 64z')}</span></button></div>`);
      el.on('click', '.k-pager [data-page]', (e) => { const p = +$(e.currentTarget).attr('data-page'); if (!$(e.currentTarget).hasClass('k-disabled')) this.dataSource.page(p); });
      el.on('click', 'th.clickable', (e) => { const f = $(e.currentTarget).attr('data-field'); const s = this.dataSource.sort() || []; const dir = s[0]?.field === f && s[0].dir === 'asc' ? 'desc' : 'asc'; this.dataSource.sort({ field: f, dir }); });
      if (o.autoBind !== false) this.dataSource.read();
    },
    options: { name: 'Grid', columns: [], sortable: false, filterable: false, pageable: true, autoBind: true },
    refresh() {
      const rows = this.dataSource.view();
      const tb = this.element.find('.k-grid-content tbody');
      tb.html(rows.length ? rows.map((r, i) => `<tr class="k-master-row k-table-row${i % 2 ? ' k-alt k-table-alt-row' : ''}" role="row">${this.columns.map((c, j) => `<td class="k-table-td" role="gridcell">${j === 0 && this.options.rowLink ? `<a class="clickable" href="javascript:void(0)">${kendo.htmlEncode(r[c.field])}</a>` : kendo.htmlEncode(c.format ? kendo.toString(r[c.field], c.format) : r[c.field])}</td>`).join('')}</tr>`).join('') : `<tr class="k-grid-norecords"><td colspan="${this.columns.length}">${this.options.noRecords || 'No records available.'}</td></tr>`);
      const ds = this.dataSource, total = ds.total(), size = ds.pageSize(), page = ds.page(), pages = Math.max(1, Math.ceil(total / size));
      const p = this.element.find('.k-pager');
      p.find('.k-pager-numbers').html(Array.from({ length: Math.min(pages, 3) }, (_, i) => `<button class="k-button k-button-flat${i + 1 === page ? ' k-button-primary k-selected' : ''}" data-page="${i + 1}"><span class="k-button-text">${i + 1}</span></button>`).join(''));
      p.find('.k-pager-info').text(total ? `${(page - 1) * size + 1} - ${Math.min(page * size, total)} of ${total} items` : 'No items to display');
      const navs = p.find('.k-pager-nav');
      navs.eq(0).toggleClass('k-disabled', page === 1); navs.eq(1).toggleClass('k-disabled', page === 1).attr('data-page', page - 1);
      navs.eq(2).toggleClass('k-disabled', page === pages).attr('data-page', page + 1); navs.eq(3).toggleClass('k-disabled', page === pages).attr('data-page', pages);
    },
  });
  register(Grid);

  // ---- Window: the client's chrome (k-window > titlebar + content), modal overlay, content loaded by AJAX ----
  const Window = ui.Widget.extend({
    init: function (element, options) {
      ui.Widget.fn.init.call(this, element, options);
      const o = this.options;
      this.element.addClass('k-window-content').attr('data-role', 'window');
      this.wrapper = $(`<div class="k-window panelForm-col-6" role="dialog" tabindex="0" style="display:none; position:absolute; min-width:90px; min-height:50px;"><div class="k-window-titlebar"><span class="k-window-title">${o.title}</span><div class="k-window-titlebar-actions"><button class="k-window-titlebar-action k-button k-button-flat k-icon-button" aria-label="Close" type="button"><span class="k-icon k-svg-icon k-svg-i-x k-button-icon">${svg('M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z')}</span></button></div></div></div>`).appendTo(document.body);
      this.wrapper.append(this.element.show());
      this.wrapper.on('click', '.k-window-titlebar-action', () => this.close());
      this.wrapper.on('keydown', (e) => { if (e.key === 'Escape') this.close(); });
    },
    options: { name: 'Window', title: '', modal: true, width: '75%', visible: false, actions: ['Close'], animation: { open: { effects: 'zoom:in fade:in', duration: 350 }, close: { effects: 'zoom:out fade:out', duration: 350 } } },
    refresh({ url }) { return $.get(url).then((html) => { this.element.html(html); kendo.init(this.element); this.trigger('refresh'); }); },
    center() { const w = this.wrapper; w.css({ left: Math.max(0, (innerWidth - w.outerWidth()) / 2 + scrollX), top: Math.max(0, (innerHeight - w.outerHeight()) / 2 + scrollY) }); return this; },
    open() {
      const z = 11502 + $('.k-window:visible').length * 2;
      if (this.options.modal) this.overlay = $('<div class="k-overlay" style="display:block; z-index:' + (z - 1) + '"></div>').appendTo(document.body);
      this.wrapper.css({ display: 'inline-flex', flexDirection: 'column', width: this.options.width, zIndex: z, opacity: 0, transform: 'scale(0.9)', transition: 'opacity 350ms, transform 350ms' });
      this.center();
      requestAnimationFrame(() => this.wrapper.css({ opacity: 1, transform: 'scale(1)' }));
      return this;
    },
    close() { this.wrapper.css({ opacity: 0, transform: 'scale(0.9)' }); setTimeout(() => { this.wrapper.hide(); this.overlay?.remove(); this.overlay = null; }, 350); this.trigger('close'); return this; },
  });
  register(Window);

  // ---- DateTimePicker: a DatePicker with a time format and a clock button ----
  const DateTimePicker = ui.DatePicker.extend({
    init: function (element, options) {
      ui.DatePicker.fn.init.call(this, element, options);
      this.element.attr('data-role', 'datetimepicker');
      this.wrapper.addClass('k-datetimepicker');
      this.wrapper.find('.k-input-button').before(`<button tabindex="-1" class="k-input-button k-button k-icon-button" aria-label="Open the time view" type="button"><span class="k-icon k-svg-icon k-svg-i-clock k-button-icon">${svg('M256 32a224 224 0 1 0 0 448 224 224 0 1 0 0-448zm16 240h-64v-32h32V128h32z')}</span></button>`);
    },
    options: { name: 'DateTimePicker', format: 'M/d/yyyy h:mm tt', timeFormat: 'h:mm tt', interval: 30 },
  });
  register(DateTimePicker);
})(window.jQuery, window.kendo);
