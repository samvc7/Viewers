import React, { useState } from 'react';
import { ChevronRight, MoreVertical, Copy, Pencil, Trash2, Eye } from 'lucide-react';

const items = [
  {
    id: 'seg-1',
    type: 'SEG',
    name: 'Segmentation FOR1',
    meta: 'S:100',
    count: '1',
    children: ['Liver', 'Tumor', 'Vessel'],
  },
  {
    id: 'seg-2',
    type: 'SEG',
    name: 'Segmentation FOR2',
    meta: 'S:100',
    count: '1',
    children: ['Lung', 'Nodule'],
  },
  {
    id: 'rt-2',
    type: 'RTSTRUCT',
    name: 'For 2 RTstruct',
    meta: 'S:1',
    count: '1',
    children: ['Heart', 'Spinal cord', 'Esophagus'],
  },
  {
    id: 'rt-1',
    type: 'RTSTRUCT',
    name: 'For 1 RTstruct',
    meta: 'S:1',
    count: '1',
    children: ['Brain stem', 'Optic nerve'],
  },
];

function ExpandableItem({
  item,
  selected,
  onSelect,
}: {
  item: (typeof items)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="border-b border-slate-800 last:border-b-0">
      <div
        className={`flex min-h-[54px] items-center gap-1 rounded-sm px-1 transition-colors ${selected ? 'bg-slate-700/80' : 'bg-slate-950 hover:bg-slate-800/80'}`}
      >
        <button
          type="button"
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.name}`}
          aria-expanded={expanded}
          onClick={event => {
            event.stopPropagation();
            setExpanded(value => !value);
          }}
          className="size-8 flex shrink-0 items-center justify-center rounded text-slate-400 transition hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <ChevronRight
            className={`size-4 transition-transform duration-200 ${expanded ? 'rotate-90 text-cyan-300' : ''}`}
          />
        </button>

        <button
          type="button"
          onClick={onSelect}
          className="min-w-0 flex-1 py-2 text-left focus:outline-none"
        >
          <div className="flex items-center gap-1.5 truncate text-[13px] font-semibold text-slate-100">
            <span className="text-cyan-300">{item.type}</span>
            <span className="truncate">{item.name}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>{item.meta}</span>
            <span aria-hidden="true">▱</span>
            <span>{item.count}</span>
          </div>
        </button>

        <div className="relative shrink-0">
          <button
            type="button"
            aria-label={`Actions for ${item.name}`}
            aria-expanded={menuOpen}
            onClick={event => {
              event.stopPropagation();
              setMenuOpen(value => !value);
            }}
            className="size-8 flex items-center justify-center rounded text-slate-400 transition hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <MoreVertical className="size-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-10 w-40 rounded-md border border-slate-700 bg-slate-900 p-1 shadow-xl">
              {[
                ['View details', Eye],
                ['Duplicate', Copy],
                ['Rename', Pencil],
                ['Delete', Trash2],
              ].map(([label, Icon]) => (
                <button
                  key={label as string}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs text-slate-200 hover:bg-slate-700"
                >
                  <Icon className="size-3.5" />
                  {label as string}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="ml-9 border-l border-cyan-500/40 py-1 pl-3">
            {item.children.map(child => (
              <button
                key={child}
                type="button"
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <span className="size-1.5 rounded-full bg-cyan-400" />
                {child}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpandableListDemo() {
  const [selected, setSelected] = useState('seg-1');

  return (
    <main className="min-h-screen bg-slate-900 p-8 text-slate-100">
      <div className="mx-auto max-w-sm">
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
            Interaction prototype
          </p>
          <h1 className="mt-1 text-lg font-semibold">Segmentation list</h1>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Chevron expands hierarchy. Row selects. Three dots opens actions.
          </p>
        </div>

        <section
          aria-label="Expandable segmentation items"
          className="bg-slate-950 overflow-visible rounded-md border border-slate-700 p-1 shadow-2xl"
        >
          {items.map(item => (
            <ExpandableItem
              key={item.id}
              item={item}
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
            />
          ))}
        </section>

        <p className="mt-3 text-center text-[11px] text-slate-500">
          Selected: {items.find(item => item.id === selected)?.name}
        </p>
      </div>
    </main>
  );
}
