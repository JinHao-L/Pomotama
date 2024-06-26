/* API Design
`items`: a list of item object, each item object contain:
  - name: the unique identifier of the object
  - label: the text shown in the tab item
  - value: the value the tab should provide

`defaultTab`: The default tab to show. If defaultTab is empty, we use the first item as a default as the value

`handler`: The handler to update the timer value
*/

/* Test Case
- All the provided items should be displayed.
- The default active item should be reflected correctly.
- Selecting the tab items updates the current timer value
- Test that you are able to initialize multiple instances of the component, each with independent states.
 */
import { useEffect, useState } from 'react';

import { TimerModeEnum } from '../../types';
import { Button } from '../ui';

interface TabItemProp {
    name: TimerModeEnum;
    label: string;
    value: number;
}

interface TabsProps {
    items: TabItemProp[];
    defaultValue?: TimerModeEnum;
    timerMode: TimerModeEnum;
    handler: (name: TimerModeEnum) => void;
}

const ACTIVE_TABS = {
    [TimerModeEnum.POMODORO]: {
        color: 'var(--bg-color-1)',
        icon: '/favicon-red.svg',
    },
    [TimerModeEnum.SHORT_BREAK]: {
        color: 'var(--bg-color-2)',
        icon: '/favicon-green.svg',
    },
    [TimerModeEnum.LONG_BREAK]: {
        color: 'var(--bg-color-3)',
        icon: '/favicon-blue.svg',
    },
};

const Tabs: React.FC<TabsProps> = ({ timerMode, items, handler }) => {
    const [activeTab, setActiveTab] = useState<TimerModeEnum>(
        TimerModeEnum.POMODORO
    );

    // when the timermode is updated, tab is also get updated as well
    useEffect(() => {
        setPrimaryColor(timerMode);
        changeIcon(timerMode);
        setActiveTab(timerMode);
    }, [timerMode]);

    function setPrimaryColor(activeTab: TimerModeEnum) {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', ACTIVE_TABS[activeTab].color);
    }

    function changeIcon(activeTab: TimerModeEnum) {
        const link = document.querySelector(
            "link[rel~='icon']"
        ) as HTMLAnchorElement;

        if (link) {
            link.href = ACTIVE_TABS[activeTab].icon;
        }
    }

    return (
        <div className="center | flex w-fit flex-row">
            {items.map(({ name, label, value }) => (
                <Button
                    key={name}
                    type="button"
                    intent="naked"
                    size="small"
                    className={`text-base ${name === activeTab ? 'active' : ''}`}
                    onClick={() => {
                        handler(name);
                        setActiveTab(name);
                    }}
                    value={value}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
};

export { Tabs };
