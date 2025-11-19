import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'apartment',
  title: 'Byty',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Číslo bytu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'building',
      title: 'Bytový dům',
      type: 'string',
      options: {
        list: [
          { title: 'BD-A1', value: 'BD-A1' },
          { title: 'BD-A2', value: 'BD-A2' },
          { title: 'BD-B1', value: 'BD-B1' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'floor',
      title: 'Patro',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'disposition',
      title: 'Dispozice',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'floorArea',
      title: 'Podlahová plocha (m²)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'usableArea',
      title: 'Užitná plocha (m²)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'price',
      title: 'Cena (Kč)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'status',
      title: 'Stav',
      type: 'string',
      options: {
        list: [
          { title: 'K dispozici', value: 'available' },
          { title: 'Rezervováno', value: 'reserved' },
          { title: 'Prodáno', value: 'sold' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rooms',
      title: 'Místnosti',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'room',
          title: 'Místnost',
          fields: [
            {
              name: 'number',
              title: 'Číslo místnosti',
              type: 'string',
            },
            {
              name: 'name',
              title: 'Název místnosti',
              type: 'string',
            },
            {
              name: 'area',
              title: 'Plocha (m²)',
              type: 'number',
            },
          ],
          preview: {
            select: {
              number: 'number',
              name: 'name',
              area: 'area',
            },
            prepare({ number, name, area }) {
              return {
                title: `${number}. ${name}`,
                subtitle: `${area} m²`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'outdoorSpaces',
      title: 'Venkovní prostory',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'outdoorSpace',
          title: 'Venkovní prostor',
          fields: [
            {
              name: 'type',
              title: 'Typ',
              type: 'string',
              options: {
                list: [
                  { title: 'Balkon', value: 'balcony' },
                  { title: 'Terasa', value: 'terrace' },
                  { title: 'Zahrada', value: 'garden' },
                ],
              },
            },
            {
              name: 'area',
              title: 'Plocha (m²)',
              type: 'number',
            },
          ],
          preview: {
            select: {
              type: 'type',
              area: 'area',
            },
            prepare({ type, area }) {
              const typeLabel = type === 'balcony' ? 'Balkon' : type === 'terrace' ? 'Terasa' : 'Zahrada'
              return {
                title: typeLabel,
                subtitle: `${area} m²`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'floorPlan',
      title: 'Půdorys',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Obrázek v záhlaví',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'locationInBuilding',
      title: 'Umístění v bytovém domě',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'locationInArea',
      title: 'Umístění v areálu',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'number',
      subtitle: 'building',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, status } = selection
      const statusText = status === 'available' ? '✅' : status === 'reserved' ? '⏳' : '❌'
      return {
        title: `Byt ${title}`,
        subtitle: `${subtitle} ${statusText}`,
      }
    },
  },
})

