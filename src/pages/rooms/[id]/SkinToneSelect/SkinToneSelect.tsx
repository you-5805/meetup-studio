import { skinTones } from '../ReactionPanel/ReactionPanel';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { SkinTone } from '../ReactionPanel/ReactionPanel';

type Props = {
  skinTone: SkinTone;
  setSkinTone: (v: SkinTone) => void;
};

export const SkinToneSelect = ({ skinTone, setSkinTone }: Props) => {
  return (
    <RadixSelect.Root defaultValue='' onValueChange={setSkinTone}>
      <RadixSelect.Trigger>
        <Tooltip label='肌の色 | Skin tone'>
          <RadixSelect.Value>
            <div className='flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white'>
              {skinTone === '' ? (
                <div className='h-9 w-9 rounded-full bg-yellow-400' />
              ) : (
                <div className='relative h-9 w-9 overflow-hidden rounded-full'>
                  <span className='absolute -top-2 -right-3 text-6xl' dangerouslySetInnerHTML={{ __html: skinTone }} />
                </div>
              )}
            </div>
          </RadixSelect.Value>
        </Tooltip>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className='overflow-hidden rounded-md bg-white shadow-lg'>
          <RadixSelect.ScrollUpButton className='flex h-[25px] cursor-default items-center justify-center bg-white text-gray-600'>
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className='flex p-2'>
            {skinTones.map((tone) => (
              <RadixSelect.Item
                key={tone}
                value={tone}
                className='relative cursor-pointer rounded-lg p-3 text-3xl hover:bg-gray-100 hover:outline-none data-[state=checked]:bg-gray-100 data-[state=checked]:outline data-[state=checked]:outline-blue-200'
              >
                <RadixSelect.ItemText dangerouslySetInnerHTML={{ __html: `&#128079;${tone}` }} />
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className='flex h-[25px] cursor-default items-center justify-center bg-white text-gray-600'>
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
          <RadixSelect.Arrow />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
